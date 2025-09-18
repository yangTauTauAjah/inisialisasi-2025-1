import {
  AssignmentsTableName,
  createClient,
  StorageBucketName,
  StudentsTableName,
  SubmissionsTableName,
} from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { FILE_UPLOAD_CONFIG } from "@/lib/constants/file-upload";

// Extended allowed file types for this specific application
const ALLOWED_FILE_TYPES: string[] = [
  ...FILE_UPLOAD_CONFIG.ALLOWED_FILE_TYPES,
  // Additional types specific to this app
  // "video/mp4",
  // "image/vnd.adobe.photoshop",
  // "application/vnd.figma",
];

export async function GET(/* request: NextRequest */) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(SubmissionsTableName)
      .select("*");

    if (error) {
      console.error("Error fetching submissions:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("An unexpected error occurred in submissions API:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

interface NewSubmission {
  name: string;
  path?: string;
  link?: string;
  user_id: number;
  sub_task_id: number;
}

const requestCounts = new Map<
  string,
  { count: number; lastRequestTime: number }
>();
const RATE_LIMIT_DURATION_MS = 60 * 1000;
const MAX_REQUESTS_PER_DURATION = 5;

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.lastRequestTime > RATE_LIMIT_DURATION_MS) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_DURATION_MS);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const ip =
      "ip" in request
        ? request.ip
        : request.headers.get("x-forwarded-for") || "unknown";

    if (typeof ip !== "string") {
      console.error("Invalid IP address format:", ip);
      return NextResponse.json(
        { error: "Invalid IP address format" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const clientData = requestCounts.get(ip);

    if (clientData) {
      if (now - clientData.lastRequestTime < RATE_LIMIT_DURATION_MS) {
        if (clientData.count >= MAX_REQUESTS_PER_DURATION) {
          console.warn(`Rate limit exceeded for IP: ${ip}`);
          return NextResponse.json(
            {
              error: `Too Many Requests. You may send request at most 5 requests per 60 seconds. Wait for the next ${
                clientData.lastRequestTime + RATE_LIMIT_DURATION_MS - now
              }s`,
            },
            { status: 429 }
          );
        } else {
          clientData.count++;
          clientData.lastRequestTime = now;
        }
      } else {
        clientData.count = 1;
        clientData.lastRequestTime = now;
      }
    } else {
      requestCounts.set(ip, { count: 1, lastRequestTime: now });
    }

    if (!request.headers.get("content-type")?.includes("multipart/form-data"))
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );

    const formData: Record<string, unknown> = {};

    for (const entry of (await request.formData()).entries()) {
      formData[entry[0]] = entry[1];
    }
    
    const nim = request.headers.get("x-student-id");

    if (typeof nim !== "string")
      return NextResponse.json({ error: "Unauthorized. Please login before submitting" }, { status: 401 });

    const { data: student } = await supabase
      .from(StudentsTableName)
      .select<"id", { id: number }>("id")
      .eq("nim", nim)
      .single();

    if (!student)
      return NextResponse.json(
        { error: `No student found with NIM: ${nim}` },
        { status: 404 }
      );

    const name = formData["name"];
    const assignmentId = Number(formData["sub_task_id"]);

    if (typeof name !== "string" || isNaN(assignmentId)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: assignment, error: fetchAssignmentError } = await supabase
      .from(AssignmentsTableName)
      .select<"id,is_link", { id: number; is_link: boolean }>("id,is_link")
      .eq("id", assignmentId)
      .single();

    if (fetchAssignmentError || !assignment) {
      console.error(
        "Error fetching sub_task:",
        fetchAssignmentError?.message || "Assignment not found"
      );
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    if (assignment.is_link) {
      const link = formData["link"];
      if (typeof link === "string") {
        const submissionData: NewSubmission = {
          user_id: student.id,
          name,
          link,
          sub_task_id: assignmentId,
        };

        const { data, error } = await supabase
          .from(SubmissionsTableName)
          .insert([submissionData])
          .select();

        if (error) {
          console.error("Error creating submission:", error.message);
          return NextResponse.json({ error: error.message }, { status: 500 });
        } else
          return NextResponse.json(
            {
              message: "Submission has been successfully uploaded",
              data: data[0],
            },
            { status: 201 }
          );
      } else {
        console.error(
          "Error uploading submission: Link to uploaded file is required for this assignment"
        );
        return NextResponse.json(
          { message: "Link to uploaded file is required for this assignment" },
          { status: 400 }
        );
      }
    } else {
      const file = formData["file"];

      if (!file) {
        return NextResponse.json(
          { error: "No file uploaded" },
          { status: 400 }
        );
      } else if (!(file instanceof File)) {
        return NextResponse.json(
          { error: "Uploaded data is not a file" },
          { status: 400 }
        );
      }

      // --- Server-side file size validation ---
      if (file.size > FILE_UPLOAD_CONFIG.MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { 
            error: `File size exceeds ${FILE_UPLOAD_CONFIG.MAX_FILE_SIZE_KB}KB limit. Your file: ${FILE_UPLOAD_CONFIG.formatFileSize(file.size)}` 
          },
          { status: 413 }
        );
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File type not allowed: ${file.type}` },
          { status: 400 }
        );
      }

      const filePath = `${nim}/${Date.now()}_${file.name.replace(/\s/g, "_")}`;

      const { error: uploadError } = await supabase.storage
        .from(StorageBucketName)
        .upload(filePath, file, {
          cacheControl: "3600", // Cache for 1 hour
          upsert: false, // Do not overwrite if file exists
          contentType: file.type, // Set content type based on the uploaded file
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError.message);
        return NextResponse.json(
          {
            error: `Failed to upload file to storage: ${uploadError.message}`,
          },
          { status: 500 }
        );
      }

      const submissionData: NewSubmission = {
        user_id: student.id,
        name,
        path: filePath,
        sub_task_id: assignmentId,
      };

      const { data, error } = await supabase
        .from(SubmissionsTableName)
        .insert([submissionData])
        .select('id,name,path,link,created_at');

      if (error) {
        console.error("Error creating submission:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else
        return NextResponse.json(
          {
            message: "Submission has been successfully uploaded",
            data: data[0]
          },
          { status: 201 }
        );
    }
  } catch (err) {
    console.error(
      "An unexpected error occurred during submission creation:",
      err
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import {
  AssignmentGroup,
  AssignmentGroupsTableName,
  createClient,
} from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(/* request: NextRequest */) {
  try {
    const supabase = await createClient();
    // Fetch all data from the 'assignmentGroups' table
    const { data, error } = await supabase
      .from(AssignmentGroupsTableName)
      .select("*")
      .order("created_at");

    if (error) {
      console.error("Error fetching assignment groups:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("An unexpected error occurred in assignmentGroups API:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: Partial<AssignmentGroup> = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from(AssignmentGroupsTableName)
      .insert([body])
      .select('id,name,is_active');

    if (error) {
      console.error("Error creating assignment group:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    console.error(
      "An unexpected error occurred during assignment group creation:",
      err
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

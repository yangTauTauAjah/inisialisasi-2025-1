// import { mockStudents } from '@/app/lib/mockData';
import { signJWT } from "@/app/lib/supabase/middleware";
import { createClient } from "@/app/lib/supabase/server";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { nim, password } = await request.json();

    const supabase = await createClient();

    // In a real scenario, nim might be their email directly.
    // For this mock, we map nim (e.g., 's1') to an email from mockStudents.
    const { data: student, error } = await supabase
      .from("users")
      .select("nim,hashed_password")
      .eq("nim", nim)
      .eq("is_admin", true); /* .find(s => s.id === nim); */

    if (error) {
      console.error("Supabase error while fetching user data:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else if (student.length === 0) {
      return NextResponse.json(
        { error: "Student ID not found." },
        { status: 404 }
      );
    } else if (!student[0].hashed_password) {
      return NextResponse.json(
        {
          error:
            "This student ID has not been confirmed yet. Please confirm your password first.",
        },
        { status: 401 }
      );
    } else if (!(await compare(password, student[0].hashed_password))) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: student[0].email,
    //   password: password,
    // });

    // Login successful. Supabase automatically handles session cookies in Next.js environments
    // or provides a session object. You might want to return a user ID or a limited token.
    console.log(`Student ${nim} logged in successfully via Supabase.`);
    const response = NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    );
    response.cookies.set("session-token", await signJWT({ nim }), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });
    return response;
  } catch (error: unknown) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

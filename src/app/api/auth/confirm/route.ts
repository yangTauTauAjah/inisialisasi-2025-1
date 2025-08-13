import { NextResponse } from "next/server";
// import { mockStudents } from '@/app/lib/mockData';
import { createClient } from "@/lib/supabase/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    
    const { nim, confirmToken, password = '' } = await request.json();

    const supabase = await createClient();

    // Map nim to email for Supabase Auth
    const { data: student, error: selectError } = await supabase
      .from("users")
      .select("nim,confirm_token,hashed_password")
      .eq("nim", nim)
      .eq('is_admin', false);

    if (selectError) {
      console.error("Supabase error while fetching user data:", selectError.message);
      return NextResponse.json({ error: selectError.message }, { status: 500 });
    } if (student.length === 0) {
      return NextResponse.json(
        { message: "Student ID not found." },
        { status: 404 }
      );
    } else if (student[0].hashed_password) {
      return NextResponse.json(
        {
          error:
            "This student id has done confirmation already. If you forgot your password, please contact admin for password change request.",
        },
        { status: 401 }
      );
    } else if (student[0].confirm_token !== confirmToken) {
      console.error("Incorrect confirmation token.");
      return NextResponse.json(
        { message: "Incorrect confirmation token." },
        { status: 401 }
      );
    } else if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }


    const { error } = await supabase
      .from("users")
      .update({ hashed_password: await bcrypt.hash(password, 10) })
      .eq("nim", nim);

    if (error) {
      console.error("Supabase password update error:", error.message);
      // If the update fails, you might want to sign out the user or handle the session.
      await supabase.auth.signOut(); // Sign out if password update fails
      console.error(
        `Failed to update password for student ${nim}:`,
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(
      `Student ${nim} password updated successfully via Supabase.`
    );
    return NextResponse.json(
      {
        message:
          "Password updated successfully! Please log in with your new password.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

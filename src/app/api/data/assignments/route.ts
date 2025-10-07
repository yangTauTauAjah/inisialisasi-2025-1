import { Assignment, AssignmentGroupsTableName, AssignmentsTableName, createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(/* request: NextRequest */) {
  try {
    const supabase = await createClient();
    // Fetch all data from the 'assignments' table
    const { data, error } = await supabase
      .from(AssignmentsTableName)
      .select("*");

    if (error) {
      console.error("Error fetching assignments:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("An unexpected error occurred in assignments API:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: Partial<Assignment> = await request.json();

    if (
      typeof body.name !== "string" ||
      typeof body.description !== "string" ||
      !body.due ||
      isNaN(new Date(body.due).getTime()) ||
      // typeof body.active !== "boolean" ||
      typeof body.is_link !== "boolean" ||
      typeof body.task_group_id !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const {data: assignmetGroup, error: groupFindError} = await supabase
      .from(AssignmentGroupsTableName)
      .select('name')
      .eq('id', body.task_group_id)

    if (groupFindError) {
      console.error("Error creating assignment:", groupFindError.message);
      return NextResponse.json({ error: groupFindError.message }, { status: 500 });
    }

    if (assignmetGroup.length === 0) {
      console.error("Assignment group not found");
      return NextResponse.json({ error: "Assignment group not found" }, { status: 404 });
    }

    const { data: assignment, error } = await supabase
      .from(AssignmentsTableName)
      .insert([{ ...body, due: new Date(body.due) }])
      .select('id,name,description,due,is_link,task_group_id')
      .order('id');

    if (error) {
      console.error("Error creating assignment:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({...assignment[0],group: assignmetGroup[0].name}, { status: 201 });
  } catch (err) {
    console.error(
      "An unexpected error occurred during assignment creation:",
      err
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

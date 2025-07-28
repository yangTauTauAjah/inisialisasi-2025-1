import { AssignmentsTableName, createClient, SubmissionsTableName } from "@/app/(app)/lib/supabase/server";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(
  request: Request,
  segmentData: { params: Params }
) {
  const { id } = await segmentData.params;
  try {
    const supabase = await createClient();

    const assignmentId = parseInt(id);
    if (isNaN(assignmentId)) {
      return NextResponse.json(
        { error: "Invalid assignment ID" },
        { status: 400 }
      );
    }

    const {data: submissions, error: findSubmissionError} = await supabase
      .from(SubmissionsTableName)
      .select<'id', {id: number}>('id')
      .eq('sub_task_id', assignmentId)

    if (findSubmissionError) {
      console.error(
        `Error deleting assignment assignment with ID ${id}:`,
        findSubmissionError.message
      );
      return NextResponse.json({ error: findSubmissionError.message }, { status: 500 });
    }

    if (submissions.length > 0) {
      return NextResponse.json(
        { error: `Assignment with id ${assignmentId} still have submissions associated with it, can't remove this assignment.` },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from(AssignmentsTableName)
      .delete()
      .eq("id", assignmentId)
      .select();

    if (error) {
      console.error(
        `Error deleting assignment assignment with ID ${id}:`,
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: `Assignment assignment with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Assignment assignment deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      `An unexpected error occurred during assignment assignment deletion for ID ${id}:`,
      err
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;
  try {
    const { name, description, due, task_group_id, is_link } = await request.json();

    // Basic validation
    if (!name || !description || !due || !task_group_id || typeof is_link !== 'boolean') {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, due, or group.",
        },
        { status: 400 }
      );
    }

    // Prepare data for Supabase update
    const updateData = {
      name,
      description,
      due,
      task_group_id,
      is_link
    };

    const { data, error } = await supabase
      .from(AssignmentsTableName)
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const updatedAssignment = data ? data[0] : null;

    if (!updatedAssignment) {
      return NextResponse.json(
        { error: "Assignment not found or no changes made." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Assignment updated successfully!",
        assignment: updatedAssignment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating assignment ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to update assignment." },
      { status: 500 }
    );
  }
}

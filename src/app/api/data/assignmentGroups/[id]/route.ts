import {
  AssignmentGroupsTableName,
  createClient,
} from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(
  request: Request,
  segmentData: { params: Params }
) {
  const { id } = await segmentData.params;
  try {
    const supabase = await createClient();

    const groupId = parseInt(id);
    if (isNaN(groupId)) {
      return NextResponse.json(
        { error: "Invalid assignment group ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from(AssignmentGroupsTableName)
      .delete()
      .eq("id", groupId)
      .select();

    if (error) {
      console.error(
        `Error deleting assignment group with ID ${id}:`,
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: `Assignment group with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Assignment group deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      `An unexpected error occurred during assignment group deletion for ID ${id}:`,
      err
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

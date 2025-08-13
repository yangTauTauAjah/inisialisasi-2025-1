import {
  AssignmentGroupsTableName,
  createClient,
} from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = await createClient();
    const groupId = Number(id);
    // const { is_active } = await request.json();

    if (isNaN(groupId)) {
      return NextResponse.json(
        { error: "Group ID (number) is required." },
        { status: 400 }
      );
    }

    const { data: group, error: selectGroupError } = await supabase
      .from(AssignmentGroupsTableName)
      .select<"is_active", { is_active: boolean }>("is_active")
      .eq("id", groupId)
      .single();

    if (selectGroupError) {
      console.error("Supabase update error:", selectGroupError.message);
      return NextResponse.json(
        { error: selectGroupError.message },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from(AssignmentGroupsTableName)
      .update({ is_active: !group.is_active })
      .eq("id", groupId);

    if (error) {
      console.error("Supabase update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: `Assignment group's status toggled to ${!group.is_active} successfully!`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error toggling assignment ${id} active status:`, error);
    return NextResponse.json(
      { error: "Failed to toggle assignment active status." },
      { status: 500 }
    );
  }
}

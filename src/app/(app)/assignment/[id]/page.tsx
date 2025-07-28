import React from "react";
import { SubmissionPage } from "./Component";
import { createClient } from "@/app/(app)/lib/supabase/client";
import {
  AssignmentGroupsTableName,
  AssignmentsTableName,
} from "@/app/(app)/lib/supabase/tableAlias";
import {
  Assignment,
  AssignmentGroup,
  StudentsTableName,
  Submission,
  SubmissionsTableName,
} from "@/app/(app)/lib/supabase/server";
import { headers } from "next/headers";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let assignmentData:
    | (Omit<Assignment, "task_group_id"> & {
        group: AssignmentGroup["name"];
      })
    | undefined;

  const submittedAssignments: Submission[] = [];
  let nim: string | undefined;

  try {
    const header = await headers();
    nim = header.get("x-student-id") || undefined;
    const id = (await params).id;
    const supabase = createClient();

    const { data: _ } = await supabase
      .from(AssignmentsTableName)
      .select<"*", Assignment>("*")
      .eq("id", Number(id));

    if (_ && _.length > 0) {
      const { data: group } = await supabase
        .from(AssignmentGroupsTableName)
        .select<"name", { id: number; name: string }>("name")
        .eq("id", _[0].task_group_id);

      if (group) {
        if (_ && group)
          assignmentData = {
            id: _[0].id,
            name: _[0].name,
            description: _[0].description,
            created_at: _[0].created_at,
            due: _[0].due,
            group: group[0].name,
            is_link: _[0].is_link,
            active: _[0].active,
          };
      }
    }

    const { data: student } = await supabase
      .from(StudentsTableName)
      .select<"id", { id: number }>("id")
      .eq("nim", nim)
      .single();

    if (student) {
      const { data: submissions, error } = await supabase
        .from(SubmissionsTableName)
        .select<"*", Submission>("*")
        .eq("user_id", student.id)
        .eq("sub_task_id", Number(id));
      if (!error && submissions.length > 0)
        submittedAssignments.push(...submissions);
    }
  } catch (err) {
    console.error("An error occured: ", err);
  }

  return (
    <SubmissionPage
      nim={nim}
      assignmentData={assignmentData}
      submittedAssignments={submittedAssignments}
    />
  );
};

export default Page;

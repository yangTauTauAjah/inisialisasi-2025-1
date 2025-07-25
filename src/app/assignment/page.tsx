import React from "react";
import {
  Assignment,
  AssignmentGroup,
} from "@/app/lib/mockData";
import { SubmissionPage } from "./Component";
import { createClient } from "../lib/supabase/server";

const supabase = await createClient();

const AssignmentGroups = await supabase
  .from("task-group")
  .select<"*", AssignmentGroup>("*")
  .then((res) => res.data?.filter(e => e.is_active) || []);

const Assignments = await supabase
  .from("sub-tasks")
  .select<"*", Assignment>("*")
  .then((res) => res.data?.filter(assignment => AssignmentGroups.some(group => group.id === assignment.task_group_id)) || []);

const Page = () => {
  return (
    <>
      <SubmissionPage
        assignmentsData={Assignments}
        assignmentGroupsData={AssignmentGroups}
      />
    </>
  );
};

export default Page;

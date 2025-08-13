"use client";

import { TaskList } from "./task-list";
import { TaskDetail } from "./task-detail";
import { MobileSidebarToggle } from "./mobile-sidebar-toggle";
import {
  type AssignmentGroup,
  type Assignment,
} from "@/lib/services/assignment-service";

interface AssignmentContentProps {
  dayTitle: string;
  tasks: Assignment[];
  selectedTask: Assignment | null;
  isMobile: boolean;
  sidebarCollapsed: boolean;
  onTaskClick: (task: Assignment) => void;
  onBackToList: () => void;
  onSidebarToggle: () => void;
}

export function AssignmentContent({
  dayTitle,
  tasks,
  selectedTask,
  isMobile,
  sidebarCollapsed,
  onTaskClick,
  onBackToList,
  onSidebarToggle,
}: AssignmentContentProps) {
  return (
    <div className="w-full">
      {/* Mobile sidebar toggle button */}
      {isMobile && sidebarCollapsed && (
        <MobileSidebarToggle onToggle={onSidebarToggle} />
      )}

      <h2 className="text-2xl font-bold text-blue-900 mb-4">{dayTitle}</h2>

      {selectedTask ? (
        <TaskDetail
          task={{ ...selectedTask, deadline: selectedTask.due }}
          onBack={onBackToList}
        />
      ) : (
        <TaskList tasks={tasks} onTaskClick={onTaskClick} />
      )}
    </div>
  );
}

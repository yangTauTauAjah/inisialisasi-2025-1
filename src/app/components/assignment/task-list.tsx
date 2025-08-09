"use client"

import { TaskCard } from "./task-card"
import { type Assignment } from "@/app/lib/services/assignment-service"

interface TaskListProps {
  tasks: Assignment[]
  onTaskClick: (task: Assignment) => void
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="border-2 border-blue-900 rounded-xl p-8 text-center text-blue-900/70">
        Belum ada tugas untuk hari ini
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={{ ...task, deadline: task.due }} 
          onClick={() => onTaskClick(task)} 
        />
      ))}
    </div>
  )
}

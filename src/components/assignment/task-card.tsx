"use client"

import { Card, CardContent } from "@/components/ui/card"
import { type Assignment } from "@/lib/services/assignment-service"

export interface BasicTask extends Assignment {
  deadline: string
}

interface TaskCardProps {
  task: BasicTask
  onClick: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const formatDeadline = (dueDate: string) => {
    const date = new Date(dueDate)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    })
  }

  const isOverdue = () => {
    const now = new Date()
    const dueDate = new Date(task.due)
    return now > dueDate
  }

  const isOverdueTask = isOverdue()

  return (
    <Card
      className={`shadow-md border-2 cursor-pointer hover:shadow-lg transition-shadow ${
        isOverdueTask 
          ? 'border-red-500 bg-red-50' 
          : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{task.name}</h3>
            <p className={`font-medium text-sm ${
              isOverdueTask ? 'text-red-600' : 'text-red-600'
            }`}>
              {formatDeadline(task.due)}
              {isOverdueTask && (
                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                  Deadline Terlewat
                </span>
              )}
            </p>
            {task.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{task.description}</p>
            )}
          </div>
          {isOverdueTask && (
            <div className="ml-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"

export interface BasicTask {
  id: number
  title: string
  deadline: string
}

interface TaskCardProps {
  task: BasicTask
  onClick: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card
      className="shadow-md border-2 border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardContent className="py-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
        <p className="text-red-600 font-medium text-sm">{task.deadline}</p>
      </CardContent>
    </Card>
  )
}

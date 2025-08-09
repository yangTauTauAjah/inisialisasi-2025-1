"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export interface DetailTask {
  id: number
  title: string
  deadline: string
  description?: string
}

interface TaskDetailProps {
  task: DetailTask
  onBack: () => void
}

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  return (
    <div className="w-full">
      <Button variant="ghost" onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>

      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="pb-4">
          <h1 className="text-3xl font-bold text-blue-600">{task.title}</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-gray-700 leading-relaxed">
              {task.description ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text..."}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Pengumpulan Tugas</h2>
            <p className="text-gray-700 mb-4">
              Tugas paling lambat dikumpulkan pada <span className="text-red-600 font-medium">{task.deadline}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File Tugas
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Submit Tugas</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

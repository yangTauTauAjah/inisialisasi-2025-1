"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  assignmentService,
  type Assignment,
} from "@/app/lib/services/assignment-service";
import { useGlobalState } from "@/contexts/GlobalStateContext";

export interface DetailTask extends Assignment {
  deadline: string;
}

interface TaskDetailProps {
  task: DetailTask;
  onBack: () => void;
}

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { state } = useGlobalState();

  const formatDeadline = (dueDate: string) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const isOverdue = () => {
    const now = new Date();
    const dueDate = new Date(task.due);
    return now > dueDate;
  };

  const isOverdueTask = isOverdue();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (task.is_link && !submissionLink.trim()) {
      setError("Link submission harus diisi untuk tugas ini");
      return;
    }

    if (!task.is_link && !selectedFile) {
      setError("File harus diupload untuk tugas ini");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await assignmentService.submitAssignment(
        task.id,
        task.name, // Use the assignment name automatically
        selectedFile || undefined,
        submissionLink || undefined
      );

      setSuccess("Tugas berhasil dikumpulkan!");
      setSelectedFile(null);
      setSubmissionLink("");

      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengumpulkan tugas"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>

      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-blue-600">{task.name}</h1>
            {isOverdueTask && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                TERLAMBAT
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-gray-700 leading-relaxed">
              {task.description || "Tidak ada deskripsi tugas"}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              Pengumpulan Tugas
            </h2>
            {state.nim ? (
              <>
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    isOverdueTask
                      ? "bg-red-50 border border-red-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isOverdueTask ? "text-red-700" : "text-blue-700"
                    }`}
                  >
                    {isOverdueTask ? "⚠️ " : "📅 "}
                    Tugas paling lambat dikumpulkan pada{" "}
                    <span className="font-bold">
                      {formatDeadline(task.due)}
                    </span>
                  </p>
                  {isOverdueTask && (
                    <p className="text-red-600 text-sm mt-1">
                      Tugas ini sudah melewati batas waktu pengumpulan
                    </p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                  </div>
                )}
              </>
            ) : (
              <div className="text-red-600 text-sm">
                Login untuk submit tugas
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

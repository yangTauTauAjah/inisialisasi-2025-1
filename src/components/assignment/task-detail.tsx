"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Trash2, Download, ExternalLink } from "lucide-react";
import {
  assignmentService,
  type Assignment,
  type Submission,
} from "@/lib/services/assignment-service";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FILE_UPLOAD_CONFIG } from "@/lib/constants/file-upload";

export interface DetailTask extends Assignment {
  deadline: string;
}

interface TaskDetailProps {
  task: DetailTask;
  onBack: () => void;
}

// File size limit constants (from shared config)
const { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_KB } = FILE_UPLOAD_CONFIG;

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  // const [isDeletingSubmission, setIsDeletingSubmission] = useState<
  //   number | null
  // >(null);
  const { state } = useGlobalState();

  const fetchSubmissions = useCallback(async () => {
    if (!state.nim) return;

    setIsLoadingSubmissions(true);
    try {
      const submissionsData =
        await assignmentService.fetchSubmissionsByAssignment(task.id, state.nim);
      setSubmissions(submissionsData);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setIsLoadingSubmissions(false);
    }
  }, [state.nim, task.id]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

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

  // Use the shared formatFileSize function
  const formatFileSize = FILE_UPLOAD_CONFIG.formatFileSize;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_KB}KB. File Anda: ${formatFileSize(file.size)}`);
        setSelectedFile(null);
        // Reset the input
        event.target.value = '';
        return;
      }
      
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

    // Double-check file size before submission
    if (!task.is_link && selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setError(`Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_KB}KB. File Anda: ${formatFileSize(selectedFile.size)}`);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await assignmentService.submitAssignment(
        task.id,
        selectedFile?.name || task.name, // Use the assignment name automatically
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

      // Refresh submissions list
      await fetchSubmissions();
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

  /* const handleDeleteSubmission = async (submissionId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus submission ini?")) {
      return;
    }

    setIsDeletingSubmission(submissionId);
    try {
      await assignmentService.deleteSubmission(submissionId);
      setSuccess("Submission berhasil dihapus!");
      // Refresh submissions list
      await fetchSubmissions();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus submission"
      );
    } finally {
      setIsDeletingSubmission(null);
    }
  }; */

  const formatSubmissionDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
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
            {submissions.length > 0 ? <div className="bg-green-100 text-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                SUBMITTED
              </div> : isOverdueTask && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                TERLAMBAT
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap prose prose-img:max-w-full prose-img:h-auto"
              dangerouslySetInnerHTML={{ 
                __html: task.description || "Tidak ada deskripsi tugas" 
              }}
            />
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
                <div className="space-y-4">
                  {task.is_link ? (
                    <div>
                      <label
                        htmlFor="submission-link"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Link Submission *
                      </label>
                      <input
                        id="submission-link"
                        type="url"
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com"
                        disabled={isOverdueTask}
                      />
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="file-upload"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Upload File Tugas *
                      </label>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">
                          Maksimal ukuran file: {MAX_FILE_SIZE_KB}KB
                        </p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                        disabled={isOverdueTask}
                      />
                      {selectedFile && (
                        <p className="text-sm text-gray-600 mt-1">
                          File dipilih: {selectedFile.name} (
                          {formatFileSize(selectedFile.size)})
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isOverdueTask}
                    className={`${
                      isOverdueTask
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    } disabled:bg-gray-400 disabled:text-white`}
                  >
                    {isOverdueTask
                      ? "Tugas Telah Berakhir"
                      : isSubmitting
                      ? "Mengirim..."
                      : "Submit Tugas"}
                  </Button>

                  {isOverdueTask && (
                    <p className="text-red-600 text-sm">
                      Pengumpulan tugas telah ditutup karena melewati batas
                      waktu
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-red-600 text-sm">
                Login untuk submit tugas
              </div>
            )}
          </div>

          {/* Submissions History Section */}
          {state.nim && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                Riwayat Pengumpulan
              </h2>

              {isLoadingSubmissions ? (
                <div className="text-gray-500 text-center py-4">
                  Memuat riwayat pengumpulan...
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-gray-500 text-center py-4">
                  Belum ada pengumpulan tugas
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((submission) =>
                    submission.link ? (
                      <div
                        key={submission.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mt-2">
                              <ExternalLink className="h-4 w-4 text-blue-600 mr-1" />
                              <a
                                href={submission.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-medium text-xl"
                              >
                                {submission.link}
                              </a>
                            </div>
                            <p className="text-sm text-gray-600">
                              Dikumpulkan pada:{" "}
                              {formatSubmissionDate(submission.created_at)}
                            </p>
                          </div>
                          {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDeleteSubmission(submission.id)
                            }
                            disabled={isDeletingSubmission === submission.id}
                            className="ml-4"
                          >
                            {isDeletingSubmission === submission.id ? (
                              "Menghapus..."
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Hapus
                              </>
                            )}
                          </Button> */}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={submission.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {submission.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Dikumpulkan pada:{" "}
                              {formatSubmissionDate(submission.created_at)}
                            </p>
                            <div className="flex items-center mt-2">
                              <Download className="h-4 w-4 text-green-600 mr-1" />
                              <a
                                onClick={async (e) => {
                                  e.preventDefault();
                                  if (!submission.path) return;
                                  const to = (
                                    await createClient()
                                      .storage.from("submissions")
                                      .createSignedUrl(submission.path, 60, {
                                        download: true,
                                      })
                                  ).data?.signedUrl;
                                  if (to) router.push(to);
                                }}
                                className="text-green-600 hover:text-green-800 text-sm underline hover:cursor-pointer"
                              >
                                Download file
                              </a>
                            </div>
                          </div>
                          {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDeleteSubmission(submission.id)
                            }
                            disabled={isDeletingSubmission === submission.id}
                            className="ml-4 hover:cursor-pointer"
                          >
                            {isDeletingSubmission === submission.id ? (
                              "Menghapus..."
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Hapus
                              </>
                            )}
                          </Button> */}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

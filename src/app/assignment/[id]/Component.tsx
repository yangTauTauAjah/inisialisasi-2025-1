"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  Form,
  Input,
  Upload,
  Tag,
  Result,
  Collapse,
} from "antd";
import {
  LinkOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Assignment, AssignmentGroup } from "@/app/lib/mockData";
import useApp from "antd/es/app/useApp";
import { Submission } from "@/app/lib/supabase/server";
import { createClient } from "@/app/lib/supabase/client";

const { Title, Text } = Typography;
const { Dragger } = Upload;

export const SubmissionPage = ({
  nim,
  assignmentData,
  submittedAssignments,
}: {
  nim?: string;
  assignmentData?: Omit<Assignment, "task_group_id"> & {
    group: AssignmentGroup["name"];
  };
  submittedAssignments: Omit<Submission, "user_id" | "sub_task_id">[];
}) => {
  const router = useRouter();
  const { message, modal } = useApp();
  const [displayedSubmittedAssignments, setDisplayedSubmittedAssignments] =
    useState(submittedAssignments);

  const [form] = Form.useForm();
  const [submissionType, setSubmissionType] = useState<"file" | "link">("link");

  const onFinish = async (values: unknown) => {
    try {
      if (
        !assignmentData ||
        (submissionType !== "file" && submissionType !== "link") ||
        !(values instanceof Object)
      )
        return;

      const formData = new FormData();
      formData.append("sub_task_id", assignmentData.id.toString());

      if (assignmentData.is_link) {
        const submissionContent =
          "link" in values && typeof values.link === "string"
            ? values.link
            : "";
        formData.append("name", submissionContent);
        formData.append("link", submissionContent);
      } else {
        const submissionContent =
          "file" in values &&
          values.file instanceof Array &&
          values.file.length > 0 &&
          "originFileObj" in values.file[0]
            ? values.file[0].originFileObj
            : null;
        formData.append("name", submissionContent.name || "Untitled");
        formData.append("file", submissionContent);
      }

      message.loading({
        key: "loading",
        content: "Submitting assignment...",
        duration: 0,
      });

      const response = await fetch("/api/data/submissions", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      message.destroy();

      if (response.ok) {
        form.resetFields();
        if (res.data)
          setDisplayedSubmittedAssignments((prev) => [
            ...prev,
            {
              id: typeof res.data.id === "number" ? res.data.id : prev.length,
              name: typeof res.data.name === "string" ? res.data.name : "",
              link: typeof res.data.link === "string" ? res.data.link : "",
              path: typeof res.data.path === "string" ? res.data.path : "",
              created_at:
                typeof res.data.created_at === "string"
                  ? new Date(res.data.created_at).getTime()
                  : 0,
            },
          ]);
        modal.success({
          title: "Submission Successful!",
          content: `Your assignment for "${assignmentData.name}" has been submitted.`,
        });
      } else {
        message.error(res.error || "Failed to submit assignment.");
      }

      form.resetFields();
      setSubmissionType("file");
    } catch (err) {
      console.error("Failed to submit assignment: ", err);
      message.error("Failed to submit assignment.");
    }
  };

  const normFile = (e: unknown) => {
    if (Array.isArray(e)) {
      return e;
    } else if (e instanceof Object && "fileList" in e) return e?.fileList;
  };

  return assignmentData ? (
    <div className="p-8 w-full" style={{ padding: "2rem", width: "100%" }}>
      <Button
        className="mb-6"
        style={{ marginBottom: "1.5rem" }}
        onClick={() => router.push("/assignment")}
      >
        Back to Assignments
      </Button>
      <Card
        title={assignmentData.name}
        className="rounded-lg shadow-md mb-8"
        style={{
          backgroundColor: "var(--ant-color-bg-container)",
          marginBottom: "4rem",
        }}
      >
        <p>
          <Text strong>Description: </Text>
          <Text>{assignmentData.description}</Text>
        </p>
        <p>
          <Text strong>Due Date:</Text>{" "}
          <Text>{dayjs(assignmentData.due).format("MMMM D, YYYY")}</Text>
        </p>
        <p>
          <Text strong>Group:</Text>{" "}
          <Tag color="blue">{assignmentData.group}</Tag>
        </p>
      </Card>
      <Title level={3} className="text-white mt-10 mb-6">
        Your Previous Submissions
      </Title>
      {displayedSubmittedAssignments.length === 0 ? (
        <Text className="text-gray-400">
          You didn{"'"}t commit any submissions for this assignment yet.
        </Text>
      ) : (
        <Collapse
          accordion
          items={displayedSubmittedAssignments.map((submission) => ({
            key: submission.id,
            label: submission.name,
            children: (
              <div className="text-gray-400 p-2">
                <Text className="block mb-1">
                  Type:{" "}
                  <Tag color={submission.link ? "purple" : "geekblue"}>
                    {submission.link ? "LINK" : "FILE"}
                  </Tag>
                </Text>
                <Text className="block mb-1">
                  Content:{" "}
                  {submission.link ? (
                    <a
                      href={submission.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <LinkOutlined /> View Link
                    </a>
                  ) : (
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <PaperClipOutlined /> Download File
                    </a>
                  )}
                </Text>
                <Text className="block mb-1 text-sm">
                  Submitted On:{" "}
                  <Tag color="green">
                    {new Date(submission.created_at).toLocaleDateString("en", {
                      dateStyle: "full",
                    })}
                  </Tag>
                </Text>
              </div>
            ),
          }))}
        />
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-2xl"
        style={{
          width: "100%",
          maxWidth: "42rem",
          marginInline: "auto",
          marginTop: "2.5rem",
        }}
      >
        {nim ? (
          new Date(assignmentData.due).getTime() > Date.now() ? (
            <>
              <Title
                level={3}
                className="text-white mb-4"
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  maxWidth: "42rem",
                  marginInline: "auto",
                }}
              >
                Add New Submission
              </Title>
              {assignmentData.is_link ? (
                <Form.Item
                  name="link"
                  label="Submission Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your assignment link!",
                    },
                    { type: "url", message: "Please enter a valid URL!" },
                  ]}
                >
                  <Input placeholder="e.g., https://docs.google.com/document/d/your-assignment" />
                </Form.Item>
              ) : (
                <Form.Item
                  name="file"
                  label="Upload File"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: "Please upload your assignment file!",
                    },
                  ]}
                >
                  <Dragger
                    name="file"
                    multiple={false}
                    beforeUpload={() => false} // Prevent automatic upload
                    maxCount={1}
                    accept=".pdf,.doc,.docx,.zip,.rar"
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single upload. Strictly prohibit from
                      uploading company data or other band files.
                    </p>
                  </Dragger>
                </Form.Item>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full"
                  style={{ width: "100%" }}
                >
                  Submit Assignment
                </Button>
              </Form.Item>
            </>
          ) : (
            <Result
              status="warning"
              title="Assignment overdued"
              subTitle="You cannot submit this assignment anymore."
              extra={
                <Button
                  onClick={() => router.push("/assignment")}
                  type="primary"
                >
                  Go to assignments menu
                </Button>
              }
            />
          )
        ) : (
          <Result
            status="403"
            title="Unauthorized"
            subTitle="Please login before submitting."
            extra={
              <>
                <Button
                  onClick={() => router.push("/assignment")}
                  type="default"
                >
                  Back to menu
                </Button>
                <Button onClick={() => router.push("/auth")} type="primary">
                  Go to login page
                </Button>
              </>
            }
          />
        )}
      </Form>
    </div>
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Assignment Not Found."
      extra={
        <Button onClick={() => router.push("/assignment")} type="primary">
          Back to menu
        </Button>
      }
    />
  );
};

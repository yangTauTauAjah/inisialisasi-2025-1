"use client";
import React, { useState, useEffect } from "react";
import { Typography, Table, Spin, Tag, Tooltip } from "antd";
import { createClient } from "@/app/(app)/lib/supabase/client";
import {
  AssignmentsTableName,
  StudentsTableName,
  SubmissionsTableName,
} from "@/app/(app)/lib/supabase/tableAlias";
import { Submission } from "@/app/(app)/lib/mockData";
import { useRouter } from "next/navigation";

const { Title } = Typography;

// Component to handle async data fetching for a single cell
const AsyncDataCell: React.FC<{
  asyncFunction: (...params: number[]) => Promise<string>;
  args: number[];
}> = ({ asyncFunction, args }) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted component
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (isMounted) {
          setData(result);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(`Error: ${err}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup for unmounting
    };
  }, [args, asyncFunction]); // Re-run effect if NIM changes

  if (loading) {
    return <Spin size="small" />;
  }

  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  }

  return <span>{data}</span>;
};

const SubmissionsData = () => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<
    (Submission & { type: string })[]
  >([]);
  const router = useRouter();

  const getAssignmentName = async (assignmentId: number) => {
    const assignmentName = await createClient()
      .from(AssignmentsTableName)
      .select<"name", { name: string }>("name")
      .eq("id", assignmentId)
      .then((res) => {
        console.log(assignmentId, res.data);
        if (res.data && res.data?.length > 0) {
          return res.data[0].name;
        }
      });
    return assignmentName ? assignmentName : "Unassigned";
  };

  const getStudentName = async (studentId: number) => {
    const assignmentName = await createClient()
      .from(StudentsTableName)
      .select<"nama", { nama: string }>("nama")
      .eq("id", studentId)
      .then((res) => {
        if (res.data && res.data?.length > 0) {
          return res.data[0].nama;
        }
      });
    return assignmentName ? assignmentName : "Not found";
  };

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase
      .from(SubmissionsTableName)
      .select<"*", Submission>("*")
      .then(async (res) => {
        if (!res.data || res.data.length === 0) {
          setSubmissions([]);
          setLoading(false);
          return;
        }

        const _ = await Promise.all(
          res.data.map(async (e) => {
            const { data: assigntment } = await supabase
              .from(AssignmentsTableName)
              .select<"is_link", { is_link: boolean }>("is_link")
              .eq("id", e.sub_task_id);

            return {
              ...e,
              type: assigntment
                ? assigntment?.length > 0 && assigntment[0].is_link === true
                  ? "link"
                  : "file"
                : "",
            };
          })
        );

        setSubmissions(_);

        setLoading(false);
      });
  }, [setSubmissions]);

  const columns: (Record<string, string | ((...args: never[]) => unknown)> & {
    dataIndex: keyof Submission | "type";
  })[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Assignment",
      dataIndex: "sub_task_id",
      key: "sub_task_id",
      render: (id: number) => (
        <AsyncDataCell asyncFunction={getAssignmentName} args={[id]} />
      ),
    },
    {
      title: "Student",
      dataIndex: "user_id",
      key: "user_id",
      render: (id: number) => (
        <AsyncDataCell asyncFunction={getStudentName} args={[id]} />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => (
        <Tag color={text ? "geekblue" : "purple"}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Content",
      dataIndex: "link",
      key: "content",
      render: (text: string, record: Submission) =>
        record.link ? (
          <Tooltip title={text}>
            <a
              href={record.link}
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              View Link
            </a>
          </Tooltip>
        ) : (
          <a
            onClick={async (e) => {
              e.preventDefault();
              if (!record.path) return;
              const to = (
                await createClient()
                  .storage.from("submissions")
                  .createSignedUrl(record.path, 60, {
                    download: true,
                  })
              ).data?.signedUrl;
              if (to) router.push(to);
            }}
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Download File
          </a>
        ),
    },
    {
      title: "Submitted At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) =>
        new Date(date).toLocaleDateString("en", { dateStyle: "full" }),
    },
  ];

  return (
    <div className="p-8">
      <Title level={3} className="text-white mb-6">
        View Submissions
      </Title>
      <Table
        bordered
        loading={loading}
        scroll={{ x: 800 }}
        dataSource={submissions}
        columns={columns}
        rowKey="id"
        className="rounded-lg overflow-hidden"
        pagination={{ pageSize: 20 }}
        style={{ backgroundColor: "var(--ant-color-bg-container)" }}
      />
    </div>
  );
};

export default SubmissionsData;

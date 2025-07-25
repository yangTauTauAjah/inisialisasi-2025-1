"use client";
import React, { useState, useEffect } from "react";
import { Typography, Table, Tag } from "antd";
import { createClient } from "@/app/lib/supabase/client";
import { StudentData } from "@/app/lib/mockData";

const { Title } = Typography;

const StudentsData = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentData[]>([]);

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase
      .from("users")
      .select<"*", StudentData>()
      .then((res) => {
        setLoading(false);
        if (res.data) setStudents(res.data);
      });
  }, [setStudents]);

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "NIM", dataIndex: "nim", key: "nim" },
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Kelompok", dataIndex: "kelompok", key: "kelompok" },
    {
      title: "Is Admin",
      dataIndex: "is_admin",
      key: "is_admin",
      render: (value: boolean) =>
        value ? (
          <Tag color="green-inverse">Yes</Tag>
        ) : (
          <Tag color="red-inverse">No</Tag>
        ),
    },
    {
      title: "Email Verified At",
      dataIndex: "email_verified_at",
      key: "email_verified_at",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <div className="p-8">
      <Title level={3} className="text-white mb-6">
        Manage Students
      </Title>
      <div style={{ overflowX: "auto" }}>
        <Table
          loading={loading}
          dataSource={students.sort((a, b) => Number(a.nim) - Number(b.nim))}
          columns={columns.map((col) => ({
            ...col,
            render: col.render
              ? col.render
              : (value: unknown) =>
                  value === null || value === undefined ? "null" : value,
          }))}
          scroll={{ x: 2000 }}
          rowKey="id"
          className="rounded-lg overflow-hidden min-w-[900px]"
          // pagination={{ pageSize: 5 }}
          pagination={false}
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        />
      </div>
    </div>
  );
};

export default StudentsData;

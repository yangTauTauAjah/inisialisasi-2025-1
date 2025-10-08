"use client";
import React, { useState, useEffect } from "react";
import { Typography, Table, Spin, Tag, Tooltip, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { createClient } from "@/lib/supabase/client";
import {
  SubmissionsTableName,
} from "@/lib/supabase/tableAlias";
import { Submission } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import type { FilterDropdownProps, ColumnType } from "antd/es/table/interface";

const { Title } = Typography;


const SubmissionsData = () => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<
    (Submission & { type: string })[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase
      .from(SubmissionsTableName)
      .select<"*, sub_task_id(id, name, is_link), user_id(nama, nim, kelompok)", Submission & { sub_task_id: { id: number, name: string, is_link: boolean }, user_id: { nama: string, nim: string, kelompok: string } }>("*, sub_task_id(id, name, is_link), user_id(nama, nim, kelompok)")
      .then(async (res) => {
        if (!res.data || res.data.length === 0) {
          setSubmissions([]);
          setLoading(false);
          return;
        }

        const _ = await Promise.all(
          res.data.map(async (e) => {
            return {
              ...e,
              assignment: e.sub_task_id.name,
              student: e.user_id.nama,
              nim: e.user_id.nim,
              group: e.user_id.kelompok,
              type: e.sub_task_id.is_link === true ? "link" : "file"
            };
          })
        );

        setSubmissions(_);

        setLoading(false);
      });
  }, [setSubmissions]);

  // Search filter component
  /* const getColumnSearchProps = (dataIndex: string, placeholder: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string | number | boolean, record: Submission & { type: string }) => {
      const recordValue = record[dataIndex as keyof (Submission & { type: string })];
      return recordValue
        ? recordValue.toString().toLowerCase().includes(value.toString().toLowerCase())
        : false;
    },
  }); */

  const columns: ColumnType<Submission & { assignment: string, student: string, nim: string, group: string, type: string }>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      // ...getColumnSearchProps('name', 'name'),
    },
    {
      title: "Assignment",
      dataIndex: "assignment",
      key: "assignment",
      sorter: (a, b) => a.assignment.localeCompare(b.assignment),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      sorter: (a, b) => a.student.localeCompare(b.student),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: "NIM",
      dataIndex: "nim",
      key: "nim",
      sorter: (a, b) => a.nim.localeCompare(b.nim),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      sorter: (a, b) => a.group.localeCompare(b.group),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => (
        <Tag color={text ? "geekblue" : "purple"}>{text.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'Link', value: 'link' },
        { text: 'File', value: 'file' },
      ],
      onFilter: (value, record) => record.type === value,
      width: 100,
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
        new Date(date).toLocaleString("en", { 
          dateStyle: "full",
          timeStyle: "short"
        }),
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'descend',
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

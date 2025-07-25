"use client";
import React, { useState, useEffect } from "react";
import { /* Input, Modal Form, */ Typography, Table, Tag, } from "antd";
import { /* PlusOutlined, EditOutlined, DeleteOutlined */ } from "@ant-design/icons";
import { createClient } from "@/app/lib/supabase/client";
import { StudentData } from "@/app/lib/mockData";

const { Title } = Typography;

const StudentsData = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentData[]>([]);
  /* const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>( null );
  const [form] = Form.useForm(); */

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
      render: (value: boolean) => (value ? <Tag color="green-inverse" >Yes</Tag> : <Tag color="red-inverse" >No</Tag>),
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
    /* {
      title: "Action",
      key: "action",
      render: (_: unknown, record: StudentData) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    }, */
  ];

  /* const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  }; */

  /* const handleEdit = (student: StudentData) => {
    setEditingStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  }; */

  /* const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this student?",
      onOk: () => {
        setStudents(students.filter((s) => s.id !== id));
        Modal.success({
          title: "Success",
          content: "Student deleted successfully.",
        });
      },
    });
  }; */

  /* const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingStudent) {
          setStudents(
            students.map((s) =>
              s.id === editingStudent.id ? { ...s, ...values } : s
            )
          );
          Modal.success({
            title: "Success",
            content: "Student updated successfully.",
          });
        } else {
          setStudents([
            ...students,
            { ...values, id: `s${students.length + 1}` },
          ]);
          Modal.success({
            title: "Success",
            content: "Student added successfully.",
          });
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }; */

  return (
    <div className="p-8">
      <Title level={3} className="text-white mb-6">
        Manage Students
      </Title>
      {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-4"
      >
        Add Student
      </Button> */}
      <div style={{ overflowX: "auto" }}>
        <Table
          loading={loading}
          dataSource={students.sort((a,b) => Number(a.nim) - Number(b.nim) )}
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

      {/* <Modal
        title={editingStudent ? "Edit Student" : "Add New Student"}
        // visible={isModalVisible}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingStudent ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter student name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: "Please enter student grade!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default StudentsData;

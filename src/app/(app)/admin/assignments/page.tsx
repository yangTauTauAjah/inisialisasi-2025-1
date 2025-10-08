"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Button,
  Form,
  Input,
  Table,
  Modal,
  DatePicker,
  Select,
  Tag,
  Checkbox,
  Switch,
  App,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Assignment, AssignmentGroup } from "@/lib/mockData";
import { createClient } from "@/lib/supabase/client";
import {
  AssignmentGroupsTableName,
  AssignmentsTableName,
} from "@/lib/supabase/tableAlias";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const AssignmentsData = () => {
  const { modal, message } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<
    (Assignment & { group?: string })[]
  >([]);
  const [assignmentGroups, setAssignmentGroups] = useState<AssignmentGroup[]>(
    []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<
    (Assignment & { group?: string }) | null
  >(null);
  const [form] = Form.useForm();
  const [newGroupName, setNewGroupName] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setLoadingGroups(true);
    const supabase = createClient();
    supabase
      .from(AssignmentGroupsTableName)
      .select<"*", AssignmentGroup>()
      .then((selectGroup) => {
        setLoadingGroups(false);
        if (!selectGroup.data) return;
        setAssignmentGroups(selectGroup.data);
        supabase
          .from(AssignmentsTableName)
          .select<"*", Assignment>()
          .then((selectAssignment) => {
            setLoading(false);
            if (!selectAssignment.data) return;
            setAssignments(
              selectAssignment.data.map((assignment) => ({
                ...assignment,
                group:
                  selectGroup.data.find(
                    (group) => group.id === assignment.task_group_id
                  )?.name || "unknown group id",
              }))
            );
          });
      });
  }, [setAssignments]);

  const columns: ColumnsType<Assignment & { group?: string }> = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Group",
      dataIndex: "task_group_id",
      key: "task_group_id",
      render: (id: number, value) => <Tag color="blue">{value.group}</Tag>,
    },
    {
      title: "Submission Type",
      dataIndex: "is_link",
      key: "is_link",
      render(value) {
        return value ? "Link Submission" : "File Submission";
      },
    },
    {
      title: "Due Date",
      dataIndex: "due",
      key: "due",
      render: (text) => {
        console.log(text)
        return new Date(text).toLocaleString("en", { 
          dateStyle: "full",
          timeStyle: "short"
        })
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Assignment) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const assignmentGroupsColumns: ColumnsType<AssignmentGroup> = [
    {
      title: "Group ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
    },
    { title: "Group Name", dataIndex: "name", key: "name" },
    {
      title: "Is Active",
      key: "is_active",
      render: (_, record) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={record.is_active}
          onChange={() => handleToggleAssignmentGroup(record.id)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteAssignmentGroup(record.id)}
        />
      ),
    },
  ];

  const handleAdd = () => {
    setEditingAssignment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    form.setFieldsValue({ ...assignment, due: dayjs(assignment.due) });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this assignment?",
      onOk: async () => {
        try {
          const res = await fetch(`/api/data/assignments/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();

          if (res.ok) {
            setAssignments(assignments.filter((a) => a.id !== id));
            modal.success({
              title: "Success",
              content: "Assignment deleted successfully.",
            });
          } else {
            console.error("Error while deleting assignment: ", data.error);
            modal.error({
              title: "Error",
              content: "Error while deleting assignment.",
            });
          }
        } catch (err) {
          console.error("Error while deleting assignment: ", err);
          modal.error({
            title: "Error",
            content: "Error while deleting assignment.",
          });
        }
      },
    });
  };

  const handleAddAssignmentGroup = async () => {
    if (!newGroupName.trim()) {
      message.error("Assignment group name cannot be empty.");
      return;
    }

    message.open({
      type: "loading",
      content: "Creating new assignment group, please wait...",
      duration: 0,
      key: "loadingNewGroup",
    });

    try {
      const response = await fetch("/api/data/assignmentGroups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newGroupName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        message.destroy(`loadingNewGroup`);
        message.success(data.message || "Assignment group added successfully!");
        setAssignmentGroups((prevGroups) => [...prevGroups, data]);
        setNewGroupName("");
      } else {
        message.destroy("loadingNewGroup");
        message.error(data.error || "Failed to add assignment group.");
      }
    } catch (error) {
      console.error("Error adding assignment group:", error);
      message.destroy("loadingNewGroup");
      message.error("An unexpected error occurred while adding group.");
    }
  };

  const handleToggleAssignmentGroup = async (id: number) => {
    try {
      message.open({
        type: "loading",
        content: `Switching active status of assignment group: ${
          assignmentGroups.find((e) => e.id === id)?.name || "unknown"
        }`,
        duration: 0,
        key: `loading${id}`,
      });
      const response = await fetch(
        `/api/data/assignmentGroups/${id}/toggleActive`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.destroy(`loading${id}`);
        message.success(
          data.message ||
            `Assignment status toggled to ${
              assignmentGroups.find((e) => e.id === id)?.is_active
                ? "active"
                : "inactive"
            } successfully!`
        );
        setAssignmentGroups((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === id)
              return {
                ...group,
                is_active: !group.is_active,
              };
            else return group;
          })
        );
      } else {
        message.destroy(`loading${id}`);
        message.error(data.error || "Error toggling assignment active status.");
      }
    } catch (error) {
      message.destroy(`loading${id}`);
      console.error("Error toggling assignment active status:", error);
      message.error(
        "An unexpected error occurred during switching active status."
      );
    }
  };

  const handleDeleteAssignmentGroup = (id: number) => {
    modal.confirm({
      title: "Confirm Delete",
      content: (
        <Text>
          Are you sure you want to delete this assignment group? This action
          will also{" "}
          <Text type="danger" strong underline>
            delete the associated assignments
          </Text>{" "}
          and cannot be undone.
        </Text>
      ),
      onOk: async () => {
        try {
          const response = await fetch(`/api/data/assignmentGroups/${id}`, {
            method: "DELETE",
          });

          const data = await response.json();
          if (response.ok) {
            message.success(
              data.message || "Assignment group deleted successfully."
            );
            setAssignmentGroups((prevGroups) =>
              prevGroups.filter((group) => group.id !== id)
            );
            setAssignments((prevAssignments) =>
              prevAssignments.filter((e) => e.task_group_id !== id)
            );
          } else {
            message.error(data.error || "Failed to delete assignment group.");
          }
        } catch (error) {
          console.error("Error deleting assignment group:", error);
          message.error("An unexpected error occurred while deleting group.");
        }
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (editingAssignment) {
          try {
            const request = await fetch(
              `/api/data/assignments/${editingAssignment.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );

            const res = await request.json();

            if (request.ok) {
              setAssignments(
                assignments.map((a) =>
                  a.id === editingAssignment.id
                    ? {
                        id: editingAssignment.id,
                        ...values,
                        group:
                          assignmentGroups.find(
                            (e) => e.id === values.task_group_id
                          )?.name || "Unknown group",
                      }
                    : a
                )
              );
              modal.success({
                title: "Success",
                content: "Assignment updated successfully.",
              });
            } else {
              console.error(
                "Error while updating assignment data: ",
                res.error
              );
              modal.error({
                title: "Error",
                content: res.error || "Error while updating assignment data.",
              });
            }
          } catch (err) {
            console.error("Error while updating assignment data: ", err);
            modal.error({
              title: "Error",
              content: "Error while updating assignment data.",
            });
          }
        } else {
          try {
            const request = await fetch(`/api/data/assignments`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const res = await request.json();

            if (request.ok) {
              setAssignments([
                ...assignments,
                {
                  ...values,
                  group: assignmentGroups.find(
                    (e) => e.id === values.sub_task_id
                  ),
                },
              ]);
              modal.success({
                title: "Success",
                content: "Assignment added successfully.",
              });
            } else {
              modal.error({
                title: "Error",
                content: res.error || "Failed to add new assignment.",
              });
            }
          } catch (err) {
            console.error("Error while adding new assignment: ", err);
            modal.error({
              title: "Error",
              content: "Error while adding new assignment.",
            });
          }
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="p-8">
      <Title level={3} className="text-white mb-6">
        Manage Assignments
      </Title>

      <Space className="mb-4 w-full">
        <Input
          placeholder="New Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="flex-grow"
          onPressEnter={handleAddAssignmentGroup}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddAssignmentGroup}
        >
          Add Group
        </Button>
      </Space>
      <Table
        bordered
        size="small"
        loading={loadingGroups}
        dataSource={assignmentGroups.sort((a, b) => a.id - b.id)}
        columns={assignmentGroupsColumns}
        rowKey="id"
        className="rounded-lg overflow-hidden mb-8"
        pagination={false}
        style={{ backgroundColor: "var(--ant-color-bg-container)" }}
      />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        className="mb-4"
      >
        Add Assignment
      </Button>
      <Table
        bordered
        loading={loading}
        dataSource={assignments.sort((a, b) => a.id - b.id)}
        columns={columns}
        rowKey="id"
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--ant-color-bg-container)" }}
      />

      <Modal
        title={editingAssignment ? "Edit Assignment" : "Add New Assignment"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingAssignment ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Assignment Name"
            rules={[
              { required: true, message: "Please enter assignment name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="task_group_id"
            label="Group"
            rules={[{ required: true, message: "Please select a group!" }]}
          >
            <Select placeholder="Select a group">
              {assignmentGroups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="due" label="Due Date">
            <DatePicker showTime={{showSecond: false}} value={new Date()} className="w-full" />
          </Form.Item>
          <Form.Item
            name="is_link"
            initialValue={false}
            valuePropName="checked"
            rules={[
              {
                type: "boolean",
              },
            ]}
          >
            <Checkbox>Is Link Submission</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssignmentsData;

"use client";
import React, { useEffect, useState } from "react";
import { Typography, Button, List, Tag, Layout, Menu } from "antd";
import {
  EyeOutlined,
  FileTextOutlined,
  LeftOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Assignment, AssignmentGroup } from "../lib/mockData";

const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;

/* export interface Assignment {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  group: number;
  submitted: boolean;
} */

// Assignment Detail & Submission Form Component
export const SubmissionPage = ({
  assignmentsData,
  assignmentGroupsData,
}: {
  assignmentsData: Assignment[];
  assignmentGroupsData: AssignmentGroup[];
}) => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null); // null means "all assignments"
  // const [assignments , setAssignments] = useState(mockAssignments); // Use state to allow submission status update
  // const [groups , setAssignments] = useState(mockAssignmentGroups); // Use state to allow submission status update
  const [filteredAssignments, setFilteredAssignments] = useState<
    Assignment[]
  >([]);
  const [collapsed, setCollapsed] = useState(true); // Start collapsed

  const handleAssignmentClick = (assignmentId: number) => {
    router.push(`/assignment/${assignmentId}`);
    // setSelectedAssignment(assignment);
    // setCollapsed(true); // Collapse sidebar after selection
  };

  useEffect(() => {
    const _ =
      typeof selectedGroup === "number"
        ? assignmentsData.filter((assign) => assign.task_group_id === selectedGroup)
        : assignmentsData;
    setFilteredAssignments(_);
  }, [assignmentsData, selectedGroup]);

  /* useEffect(() => {
    if (!Number.isNaN(group)) setSelectedGroup(group);
    else setSelectedGroup(null);
  }, [seacrhParam]); */

  return (
    <Layout
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "var(--ant-color-bg-layout)" }}
    >
      {/* Sider for Assignment Groups */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        // onCollapse={setCollapsed}
        // width={250}
        // style={{
        //   overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 0,
        //   top: 64, // Adjust based on Header height
        //   zIndex: 1000,
        //   backgroundColor: 'var(--ant-color-bg-container)',
        //   borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        //   transition: 'all 0.2s',
        //   transform: collapsed ? 'translateX(-100%)' : 'translateX(0%)', // Slide in/out
        // }}
      >
        <Menu
          theme="dark"
          mode="inline"
          // collapsed={collapsed} // Pass collapsed state to Menu
          selectedKeys={
            typeof selectedGroup === "number"
              ? [selectedGroup.toString()]
              : ["all"]
          }
          // onClick={handleGroupSelect}
          items={[
            {
              key: "all",
              icon: <EyeOutlined />,
              label: "All Assignments",
              onClick: () => setSelectedGroup(null),
            },
            ...assignmentGroupsData.map((group) => ({
              key: group.id.toString(),
              icon: <FileTextOutlined />,
              label: group.name,
              onClick: () => setSelectedGroup(group.id),
            })),
          ]}
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        />
      </Sider>

      {/* Main content area - no margin-left adjustment */}
      <Layout style={{ minHeight: "100%" }}>
        <Header style={{ paddingInline: "1.5rem" }}>
          {/* Toggle button for the Sider */}
          <Button
            type="primary"
            icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className="p-6">
          <div className="w-full">
            <Title level={3} className="text-white mb-6">
              {typeof selectedGroup === "number"
                ? `Assignments in: ${
                    assignmentGroupsData.find((e) => e.id === selectedGroup)?.name
                  }`
                : "All Assignments"}
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={filteredAssignments}
              renderItem={(assign) => (
                <List.Item
                  className="cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-md mb-2 p-4"
                  style={{
                    backgroundColor: "var(--ant-color-bg-container-light)",
                  }}
                  onClick={() => router.push(`/assignment/${assign.id}`)}
                  actions={[
                    <Button
                      key={0}
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignmentClick(assign.id);
                      }}
                    >
                      View Details
                    </Button>,
                    (new Date(assign.due).getTime() > Date.now()) ? (
                      <Tag color="green">Assigned</Tag>
                    ) : (
                      <Tag color="orange">Overdue</Tag>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={<Text className="text-white">{assign.name}</Text>}
                    description={
                      <div className="text-gray-400">
                        <Text className="block text-gray-400">
                          {assign.description.substring(0, 100)}...
                        </Text>
                        <Text className="block text-gray-400 text-sm mt-1">
                          Due: {dayjs(assign.due).format("MMMM D, YYYY")}
                        </Text>
                        <Tag color="blue" style={{marginTop: '1rem'}}>
                          {assignmentGroupsData.find((e) => assign.task_group_id === e.id)?.name}
                        </Tag>
                        <Tag color={assign.is_link ? "purple" : "geekblue"}>
                          {assign.is_link ? "Link Submission" : "File Submission"}
                        </Tag>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
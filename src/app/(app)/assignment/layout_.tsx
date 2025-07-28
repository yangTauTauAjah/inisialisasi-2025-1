'use client'
import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  MenuOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { mockAssignments } from "@/app/(app)/lib/mockData";

const { Header, Content, Sider } = Layout;

const SubmissionPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [assignments, setAssignments] = useState(mockAssignments); // Use state to allow submission status update
  const [collapsed, setCollapsed] = useState(true); // Start collapsed

  useState(() => {
    setAssignments(mockAssignments);
  });

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
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={searchParams.get('group') ? [searchParams.get('group')?.toString() || ''] : ["all"]}
          items={[
            { key: 'all', icon: <EyeOutlined />, label: "All Assignments", onClick: () =>  router.push(`/assignment`)},
            ...assignments.map((group) => ({
              key: group.id.toString(),
              icon: <FileTextOutlined />,
              label: group.name,
              onClick: () => router.push(`/assignment?group=${group.id}`)
            })),
          ]}
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        />
      </Sider>

      {/* Main content area - no margin-left adjustment */}
      <Layout style={{ minHeight: "100%" }}>
        <Header style={{paddingInline: '1.5rem'}}>
          {/* Toggle button for the Sider */}
          <Button
            type="primary"
            icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className="p-6">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SubmissionPage;

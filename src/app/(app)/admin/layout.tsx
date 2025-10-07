"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, App } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SendOutlined,
  MenuOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

const AdminPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathName = usePathname();
  const [adminSubPage, setAdminSubPage] = useState(
    pathName.slice(1).split("/")[1] || "dashboard"
  );
  const [collapsed, setCollapsed] = useState(true); // Start collapsed

  return (
    <App>
      <Layout
        className="h-full rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--ant-color-bg-layout)" }}
      >
        {/* Sider for Admin Menu */}
        <Sider collapsible collapsed={collapsed} trigger={null}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[adminSubPage]}
            items={[
              {
                key: "dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                onClick: () => {
                  setAdminSubPage("dashboard");
                  router.push("/admin");
                },
              },
              {
                key: "students",
                icon: <UserOutlined />,
                label: "Students Data",
                onClick: () => {
                  setAdminSubPage("students");
                  router.push("/admin/students");
                },
              },
              {
                key: "assignments",
                icon: <FileTextOutlined />,
                label: "Assignments Data",
                onClick: () => {
                  setAdminSubPage("assignments");
                  router.push("/admin/assignments");
                },
              },
              {
                key: "submissions",
                icon: <SendOutlined />,
                label: "Submissions",
                onClick: () => {
                  setAdminSubPage("submissions");
                  router.push("/admin/submissions");
                },
              },
            ]}
            style={{ backgroundColor: "var(--ant-color-bg-container)" }}
          />
        </Sider>

        {/* Main content area - no margin-left adjustment */}
        <Layout style={{ minHeight: "100%" }}>
          <Header
            className="px-6"
            style={{
              paddingInline: "1.5rem",
              backgroundColor: "var(--ant-color-bg-header)",
            }}
          >
            {/* Toggle button for the Sider */}
            <Button
              suppressHydrationWarning
              type="primary"
              icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Content className="p-6">{children}</Content>
        </Layout>
      </Layout>
    </App>
  );
};

export default AdminPage;

"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SendOutlined,
  MenuOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

const AdminPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathName = usePathname();
  const [adminSubPage, setAdminSubPage] = useState(pathName.slice(1).split("/")[1] || "dashboard");
  const [collapsed, setCollapsed] = useState(true); // Start collapsed

  /* const handleAdminMenuClick = (e: unknown) => {
    if (!(e instanceof Object) || !("key" in e) || typeof e.key !== "string")
      return;
    router.push(`/${e.key}`);
    setAdminSubPage(e.key);
    // setCollapsed(true); // Collapse sidebar after selection
  }; */

  return (
    <Layout
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "var(--ant-color-bg-layout)" }}
    >
      {/* Sider for Admin Menu */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        /* onCollapse={setCollapsed}
        width={250}
        collapsedWidth={0}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 64, // Adjust based on Header height
          zIndex: 1000,
          backgroundColor: 'var(--ant-color-bg-container)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.2s',
          transform: collapsed ? 'translateX(-100%)' : 'translateX(0%)', // Slide in/out
        }} */
      >
        {/* <div className="p-4">
          <Title level={4} className="text-white mb-4 text-center">Admin Menu</Title>
        </div> */}
        <Menu
          theme="dark"
          mode="inline"
          // collapsed={collapsed} // Pass collapsed state to Menu
          selectedKeys={[adminSubPage]}
          // onClick={handleAdminMenuClick}
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
        <Header className="px-6" style={{paddingInline: '1.5rem', backgroundColor: 'var(--ant-color-bg-header)'}}>
          {/* Toggle button for the Sider */}
          <Button
            suppressHydrationWarning
            type="primary"
            icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            // style={{
            //   position: 'fixed',
            //   top: 80,
            //   left: collapsed ? 20 : 270,
            //   zIndex: 1001,
            //   transition: 'all 0.2s',
            // }}
          />
        </Header>
        <Content className="p-6">
          {/* {renderAdminSubPage()} */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;

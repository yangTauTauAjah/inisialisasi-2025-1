"use client";
import {
  App,
  ConfigProvider,
  Layout,
  Menu,
  Typography,
  message,
  theme,
} from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "@ant-design/v5-patch-for-react-19";
import "../globals.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function LayoutComponent({
  children,
  studentId,
}: Readonly<{
  children: React.ReactNode;
  studentId: string | null;
}>) {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState("");
  console.log("student id:", studentId);

  useEffect(() => {
    const path = pathName.slice(1).split("/");
    if (path[0].length > 0) {
      setCurrentPage(path[0]);
    } else setCurrentPage("landing");
  }, [pathName]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          colorTextBase: "#f0f2f5",
          colorBgContainer: "#141414",
          colorBgLayout: "#001529",
          colorBorderSecondary: "rgba(255, 255, 255, 0.1)",
        },
        components: {
          Layout: {
            headerBg: "#001529",
            footerBg: "#001529",
          },
          Menu: {
            darkItemBg: "#001529",
            darkSubMenuItemBg: "#001529",
            darkItemHoverBg: "#1890ff",
            darkItemSelectedBg: "#1890ff",
            darkItemColor: "rgba(255, 255, 255, 0.65)",
            darkItemSelectedColor: "#fff",
          },
          Button: {
            colorPrimary: "#1890ff",
            colorText: "#f0f2f5",
          },
          Typography: {
            colorTextHeading: "#fff",
            colorText: "#f0f2f5",
          },
          Card: {
            headerBg: "rgba(255, 255, 255, 0.05)",
            actionsBg: "rgba(255, 255, 255, 0.05)",
            extraColor: "rgba(255, 255, 255, 0.65)",
          },
          Table: {
            headerBg: "rgba(255, 255, 255, 0.05)",
            headerColor: "#f0f2f5",
            // bodyBg: "var(--ant-color-bg-container)",
            rowHoverBg: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            footerBg: "rgba(255, 255, 255, 0.05)",
          },
          Modal: {
            // contentBg: "var(--ant-color-bg-container)",
            headerBg: "var(--ant-color-bg-container)",
            titleColor: "#fff",
            footerBg: "var(--ant-color-bg-container)",
          },
          Input: {
            activeBorderColor: "#1890ff",
            hoverBorderColor: "#1890ff",
            activeShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
          },
          Select: {
            optionSelectedBg: "rgba(24, 144, 255, 0.2)",
            optionActiveBg: "rgba(255, 255, 255, 0.08)",
            optionSelectedColor: "#1890ff",
          },
          DatePicker: {
            activeBorderColor: "#1890ff",
            hoverBorderColor: "#1890ff",
            activeShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
          },
          Upload: {
            colorFillAlter: "rgba(255, 255, 255, 0.05)",
            colorBorder: "rgba(255, 255, 255, 0.15)",
            colorText: "rgba(255, 255, 255, 0.85)",
            colorTextSecondary: "rgba(255, 255, 255, 0.65)",
          },
          Statistic: {
            colorText: "#f0f2f5",
            colorTextSecondary: "rgba(255, 255, 255, 0.65)",
          },
        },
      }}
    >
      <App>
        <Layout style={{ minHeight: "100vh" }}>
          <Header className="flex items-center" style={{ padding: "0 20px" }}>
            <Title
              level={3}
              style={{ color: "white", margin: 0, marginRight: "auto" }}
            >
              Inisialisasi 2025
            </Title>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[currentPage]}
              className="flex-grow justify-end"
              items={[
                {
                  key: "landing",
                  icon: <HomeOutlined />,
                  label: "Home",
                  onClick: () => router.push("/"),
                },
                {
                  key: "assignment",
                  icon: <UploadOutlined />,
                  label: "Submit",
                  onClick: () => router.push("/assignment"),
                },
                {
                  key: studentId ? "logout" : "login",
                  icon: studentId ? <LogoutOutlined /> : <LoginOutlined />,
                  label: studentId ? "Logout" : "Auth",
                  onClick: async () => {
                    try {
                      if (studentId) {
                        const res = await fetch("/api/auth/logout", {
                          method: "delete",
                        });
                        if (res.ok) {
                          message.success("Logout success.");
                        } else {
                          console.error("Logout failed: ", res);
                          message.error("Logout failed.");
                        }
                      } else router.push("/auth");
                    } catch (err) {
                      console.error("An error occured: ", err);
                      message.error("An error occured.");
                    }
                  },
                },
              ]}
              style={{ minWidth: 0, flex: "auto" }}
            />
          </Header>
          <Content>
            <div
              className="site-layout-content"
              style={{
                background: "var(--ant-color-bg-container)",
                padding: 24,
                minHeight: "calc(100vh - 112px)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent:
                  currentPage === "landing" ? "center" : "flex-start",
                alignItems: currentPage === "landing" ? "center" : "stretch",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          Web Inisialisasi ©2025 Created by Habib Anwash
        </Footer>
      </App>
    </ConfigProvider>
  );
}

"use client";
import { ConfigProvider, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "../globals.css";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      }}
    >
      {children}
    </ConfigProvider>
  );
} 
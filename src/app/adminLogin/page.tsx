"use client";

import React from "react";
import { Card, Typography } from "antd";
import { Form, Input, Button, message, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function AdminLogin() {
  const key = "updatable";
  const router = useRouter();
  const [form] = Form.useForm();
  const [autoLogin, setAutoLogin] = React.useState(false);

  const onFinish = async (values: Record<string, string>) => {
    message.open({
      key,
      type: "loading",
      content: "Logging you in, please wait...",
    });
    try {
      /* const form = new FormData()
      for (const key in values) {
        form.append(key, values[key]);
      }
      login(form); */
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.open({
          key,
          type: "success",
          content:
            data.message ||
            "Login successful. You will be redirected in a moment, please wait",
          duration: 2,
        });
        // message.success(data.message || "Login successful!");
        router.push("/"); // Redirect to home or dashboard
      } else {
        message.open({
          key,
          type: "error",
          content: data.error || "Login failed. Please check your credentials.",
          duration: 2,
        });
        /* message.error(
          data.error || "Login failed. Please check your credentials."
        ); */
      }
    } catch (error) {
      console.error("Login error:", error);
      message.open({
        key,
        type: "error",
        content: "An unexpected error occurred during login.",
        duration: 2,
      });
      // message.error("An unexpected error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
      <Card
        className="rounded-lg shadow-md w-full"
        style={{ backgroundColor: "var(--ant-color-bg-container)" }}
      >
        <Title level={2} className="text-white text-center mb-6">
          Admin Login
        </Title>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* {contextHolder} */}
          <Form.Item
            label="NIM"
            name="nim"
            rules={[{ required: true, message: "Please input your NIM!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="NIM (e.g., 434241000, 434241100)"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="autoLogin">
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            >
              Keep me logged in
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

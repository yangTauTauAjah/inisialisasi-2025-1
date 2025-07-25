'use client';

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/navigation';

export default function ConfirmationForm() {
  // const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: Record<string, string>) => {
    try {
      const { nim, confirmToken, password } = values;

      const response = await fetch('/api/auth/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nim, confirmToken, password }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || 'Password updated successfully! Please log in.');
        form.resetFields();
        // Optionally, you could automatically switch to the login tab here
        // if this component received a prop for that, but for now, we'll just show success.
      } else {
        message.error(data.error || 'Registration failed. Please check your NIM and confirm token.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('An unexpected error occurred during registration.');
    }
  };

  return (
    <Form
      form={form}
      name="Confirm"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="NIM"
        name="nim"
        rules={[{ required: true, message: 'Please input your NIM!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="NIM (e.g., 434241000, 434241100)" />
      </Form.Item>

      <Form.Item
        label="Confirmation Token"
        name="confirmToken"
        rules={[{ required: true, message: 'Please input your confirmation token!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Token (e.g., ABCabc)" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your new password!' },
          { min: 8, message: 'Password must be at least 8 characters long!' },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-4" size="large">
          Set Password
        </Button>
      </Form.Item>
    </Form>
  );
}

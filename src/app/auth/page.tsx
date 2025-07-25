'use client';

import React, { useState } from 'react';
import { Card, Typography, Tabs } from 'antd';
import ConfirmationForm from '../components/auth/ConfirmationForm';
import LoginForm from '../components/auth/LoginForm';

const { Title } = Typography;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('login'); // Default to login tab

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
      <Card
        className="rounded-lg shadow-md w-full"
        style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
      >
        <Title level={2} className="text-white text-center mb-6">Authentication</Title>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          centered
          size="large"
          className="w-full"
          items={
            [
              { label: 'Login', key: 'login', children: <LoginForm /> },
              { label: 'Confirm', key: 'confirm', children: <ConfirmationForm /> },
            ]
          }
        />
      </Card>
    </div>
  );
}

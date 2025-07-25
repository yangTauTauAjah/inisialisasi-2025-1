'use client'
// import Image from "next/image";
import React from "react";
import { Typography, Card, List } from "antd";
import dayjs from "dayjs";
import { mockEvents } from "@/app/lib/mockData";
const { Title, Text } = Typography;

// --- Landing Page Component ---
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <Title level={2} className="text-white mb-6">
      Welcome to the Assignment Submission Portal
    </Title>
    <Text className="text-gray-300 text-lg mb-8">
      Your central hub for submitting and managing assignments.
    </Text>

    <Title level={3} className="text-white mt-8 mb-4">
      Current Ongoing Events
    </Title>
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
      dataSource={mockEvents}
      renderItem={(event) => (
        <List.Item>
          <Card
            title={event.name}
            className="rounded-lg shadow-md"
            style={{
              width: "100%",
              backgroundColor: "var(--ant-color-bg-container)",
            }}
            extra={
              <Text type="secondary">
                {dayjs(event.date).format("MMMM D, YYYY")}
              </Text>
            }
          >
            <Text className="text-gray-300">{event.description}</Text>
          </Card>
        </List.Item>
      )}
      className="w-full max-w-4xl"
    />
  </div>
);

export default LandingPage;
"use client";
import React, { useEffect, useState } from "react";
import { Typography, Card, Statistic } from "antd";
import { createClient } from "../../../lib/supabase/client";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [numStudent, setNumStudent] = useState(0);
  const [numAssignment, setNumAssignment] = useState(0);
  const [numSubmission, setNumSubmission] = useState(0);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("users")
      .select("id")
      .order("id", { ascending: false }) // Order by id descending to easily get the max
      .limit(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setNumStudent(res.data[0]["id"]);
        }
      });

    supabase
      .from("sub-tasks")
      .select("id")
      .order("id", { ascending: false }) // Order by id descending to easily get the max
      .limit(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setNumAssignment(res.data[0]["id"]);
        }
      });

    supabase
      .from("file_managers")
      .select("id")
      .order("id", { ascending: false }) // Order by id descending to easily get the max
      .limit(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setNumSubmission(res.data[0]["id"]);
        }
      });
  }, [setNumStudent, setNumAssignment, setNumSubmission]);
  return (
    <div className="p-8 text-center min-h-screen">
      <Title level={3} className="text-white">
        Admin Dashboard Overview
      </Title>
      <Text className="text-gray-300">
        Quick statistics and insights will be displayed here.
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card
          className="rounded-lg shadow-md"
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        >
          <Statistic
            title="Total Students"
            value={numStudent}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card
          className="rounded-lg shadow-md"
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        >
          <Statistic
            title="Total Assignments"
            value={numAssignment}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
        <Card
          className="rounded-lg shadow-md"
          style={{ backgroundColor: "var(--ant-color-bg-container)" }}
        >
          <Statistic
            title="Total Submissions"
            value={numSubmission}
            valueStyle={{ color: "#08c" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

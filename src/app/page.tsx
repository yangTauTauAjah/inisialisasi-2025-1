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

// // --- Submission Page Components ---

// // Assignment Detail & Submission Form Component
// const AssignmentDetail = ({ assignment, onBack, onSubmit }) => {
//   const [form] = Form.useForm();
//   const [submissionType, setSubmissionType] = useState('file'); // 'file' or 'link'

//   // Reset form when assignment changes
//   useEffect(() => {
//     form.resetFields();
//     setSubmissionType('file'); // Reset submission type
//   }, [assignment, form]);

//   const onFinish = (values) => {
//     onSubmit({
//       assignmentId: assignment.id,
//       submissionType,
//       submissionContent: submissionType === 'file' ? values.file?.[0]?.name : values.link, // Simplified file name
//       // In a real app, you'd handle file uploads and link validation
//     });
//     form.resetFields();
//     setSubmissionType('file');
//   };

//   const normFile = (e) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   return (
//     <div className="p-8 w-full">
//       <Button onClick={onBack} className="mb-6">Back to Assignments</Button>
//       <Card
//         title={assignment.name}
//         className="rounded-lg shadow-md mb-8"
//         style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//       >
//         <p><Text strong>Description:</Text> <Text>{assignment.description}</Text></p>
//         <p><Text strong>Due Date:</Text> <Text>{dayjs(assignment.dueDate).format('MMMM D, YYYY')}</Text></p>
//         <p><Text strong>Group:</Text> <Tag color="blue">{assignment.group}</Tag></p>
//       </Card>

//       <Title level={3} className="text-white mb-4">Submit Your Assignment</Title>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         className="w-full max-w-2xl"
//       >
//         <Form.Item label="Submission Type">
//           <Select value={submissionType} onChange={setSubmissionType} className="w-full">
//             <Option value="file"><PaperClipOutlined /> File Submission</Option>
//             <Option value="link"><LinkOutlined /> Link Submission</Option>
//           </Select>
//         </Form.Item>

//         {submissionType === 'file' ? (
//           <Form.Item
//             name="file"
//             label="Upload File"
//             valuePropName="fileList"
//             getValueFromEvent={normFile}
//             rules={[{ required: true, message: 'Please upload your assignment file!' }]}
//           >
//             <Dragger
//               name="file"
//               multiple={false}
//               beforeUpload={() => false} // Prevent automatic upload
//               maxCount={1}
//               accept=".pdf,.doc,.docx,.zip,.rar"
//             >
//               <p className="ant-upload-drag-icon">
//                 <UploadOutlined />
//               </p>
//               <p className="ant-upload-text">Click or drag file to this area to upload</p>
//               <p className="ant-upload-hint">
//                 Support for a single upload. Strictly prohibit from uploading company data or other
//                 band files.
//               </p>
//             </Dragger>
//           </Form.Item>
//         ) : (
//           <Form.Item
//             name="link"
//             label="Submission Link"
//             rules={[{ required: true, message: 'Please enter your assignment link!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
//           >
//             <Input placeholder="e.g., https://docs.google.com/document/d/your-assignment" />
//           </Form.Item>
//         )}

//         <Form.Item>
//           <Button type="primary" htmlType="submit" size="large" className="w-full">
//             Submit Assignment
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// const SubmissionPage = () => {
//   const [selectedGroup, setSelectedGroup] = useState(null); // null means "all assignments"
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [assignments, setAssignments] = useState(mockAssignments); // Use state to allow submission status update
//   const [collapsed, setCollapsed] = useState(true); // Start collapsed

//   const handleGroupSelect = (e) => {
//     setSelectedGroup(e.key === 'all' ? null : e.key);
//     setSelectedAssignment(null); // Clear selected assignment when group changes
//     // setCollapsed(true); // Collapse sidebar after selection
//   };

//   const handleAssignmentClick = (assignment) => {
//     setSelectedAssignment(assignment);
//     // setCollapsed(true); // Collapse sidebar after selection
//   };

//   const handleAssignmentSubmission = (submissionData) => {
//     console.log('Assignment Submitted:', submissionData);
//     // In a real app, you'd send this to a backend/Firestore
//     // For now, let's mark the assignment as submitted
//     setAssignments(prevAssignments =>
//       prevAssignments.map(assign =>
//         assign.id === submissionData.assignmentId ? { ...assign, submitted: true } : assign
//       )
//     );
//     setSelectedAssignment(null); // Go back to assignment list after submission
//     Modal.success({
//       title: 'Submission Successful!',
//       content: `Your assignment "${submissionData.assignmentId}" has been submitted.`,
//     });
//   };

//   const filteredAssignments = selectedGroup
//     ? assignments.filter(assign => assign.group === selectedGroup)
//     : assignments;

//   return (
//     <Layout className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--ant-color-bg-layout)' }}>
//       {/* Sider for Assignment Groups */}
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         trigger={null}
//         // onCollapse={setCollapsed}
//         // width={250}
//         // style={{
//         //   overflow: 'auto',
//         //   height: '100vh',
//         //   position: 'fixed',
//         //   left: 0,
//         //   top: 64, // Adjust based on Header height
//         //   zIndex: 1000,
//         //   backgroundColor: 'var(--ant-color-bg-container)',
//         //   borderRight: '1px solid rgba(255, 255, 255, 0.1)',
//         //   transition: 'all 0.2s',
//         //   transform: collapsed ? 'translateX(-100%)' : 'translateX(0%)', // Slide in/out
//         // }}
//       >
//         {/* <div className="p-4">
//           <Title level={4} className="text-white mb-4">Assignment Groups</Title>
//         </div> */}
//         <Menu
//           theme="dark"
//           mode="inline"
//           collapsed={collapsed} // Pass collapsed state to Menu
//           selectedKeys={selectedGroup ? [selectedGroup] : ['all']}
//           onClick={handleGroupSelect}
//           items={[
//             { key: 'all', icon: <EyeOutlined />, label: 'All Assignments' },
//             ...mockAssignmentGroups.map(group => ({
//               key: group.name,
//               icon: <FileTextOutlined />,
//               label: group.name,
//             })),
//           ]}
//           style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//         />
//       </Sider>

//       {/* Main content area - no margin-left adjustment */}
//       <Layout style={{ minHeight: '100%' }}>
//         <Header className="px-6">
//           {/* Toggle button for the Sider */}
//           <Button
//             type="primary"
//             icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             // style={{
//             //   position: 'fixed',
//             //   top: 80,
//             //   left: collapsed ? 20 : 270,
//             //   zIndex: 1001,
//             //   transition: 'all 0.2s',
//             // }}
//           />
//         </Header>
//         <Content className="p-6">
//           {selectedAssignment ? (
//             <AssignmentDetail
//               assignment={selectedAssignment}
//               onBack={() => setSelectedAssignment(null)}
//               onSubmit={handleAssignmentSubmission}
//             />
//           ) : (
//             <div className="w-full">
//               <Title level={3} className="text-white mb-6">
//                 {selectedGroup ? `Assignments in: ${selectedGroup}` : 'All Assignments'}
//               </Title>
//               <List
//                 itemLayout="horizontal"
//                 dataSource={filteredAssignments}
//                 renderItem={assign => (
//                   <List.Item
//                     className="cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-md mb-2 p-4"
//                     style={{ backgroundColor: 'var(--ant-color-bg-container-light)' }}
//                     onClick={() => handleAssignmentClick(assign)}
//                     actions={[
//                       <Button type="link" icon={<EyeOutlined />} onClick={(e) => { e.stopPropagation(); handleAssignmentClick(assign); }}>View Details</Button>,
//                       assign.submitted ? <Tag color="green">Submitted</Tag> : <Tag color="orange">Pending</Tag>
//                     ]}
//                   >
//                     <List.Item.Meta
//                       title={<Text className="text-white">{assign.name}</Text>}
//                       description={
//                         <div className="text-gray-400">
//                           <Text className="block text-gray-400">{assign.description.substring(0, 100)}...</Text>
//                           <Text className="block text-gray-400 text-sm mt-1">Due: {dayjs(assign.dueDate).format('MMMM D, YYYY')}</Text>
//                           {!selectedGroup && <Tag color="blue" className="mt-2">{assign.group}</Tag>}
//                         </div>
//                       }
//                     />
//                   </List.Item>
//                 )}
//               />
//             </div>
//           )}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// // --- Admin Page Components ---
// const AdminDashboard = () => (
//   <div className="p-8 text-center">
//     <Title level={3} className="text-white">Admin Dashboard Overview</Title>
//     <Text className="text-gray-300">Quick statistics and insights will be displayed here.</Text>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//       <Card className="rounded-lg shadow-md" style={{ backgroundColor: 'var(--ant-color-bg-container)' }}>
//         <Statistic title="Total Students" value={mockStudents.length} valueStyle={{ color: '#3f8600' }} />
//       </Card>
//       <Card className="rounded-lg shadow-md" style={{ backgroundColor: 'var(--ant-color-bg-container)' }}>
//         <Statistic title="Total Assignments" value={mockAssignments.length} valueStyle={{ color: '#cf1322' }} />
//       </Card>
//       <Card className="rounded-lg shadow-md" style={{ backgroundColor: 'var(--ant-color-bg-container)' }}>
//         <Statistic title="Total Submissions" value={mockSubmissions.length} valueStyle={{ color: '#08c' }} />
//       </Card>
//     </div>
//   </div>
// );

// const StudentsData = () => {
//   const [students, setStudents] = useState(mockStudents);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [form] = Form.useForm();

//   const columns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Grade', dataIndex: 'grade', key: 'grade' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
//         </Space>
//       ),
//     },
//   ];

//   const handleAdd = () => {
//     setEditingStudent(null);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

//   const handleEdit = (student) => {
//     setEditingStudent(student);
//     form.setFieldsValue(student);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (id) => {
//     Modal.confirm({
//       title: 'Confirm Delete',
//       content: 'Are you sure you want to delete this student?',
//       onOk: () => {
//         setStudents(students.filter(s => s.id !== id));
//         Modal.success({ title: 'Success', content: 'Student deleted successfully.' });
//       },
//     });
//   };

//   const handleModalOk = () => {
//     form.validateFields()
//       .then(values => {
//         if (editingStudent) {
//           setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...values } : s));
//           Modal.success({ title: 'Success', content: 'Student updated successfully.' });
//         } else {
//           setStudents([...students, { ...values, id: `s${students.length + 1}` }]);
//           Modal.success({ title: 'Success', content: 'Student added successfully.' });
//         }
//         setIsModalVisible(false);
//       })
//       .catch(info => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   return (
//     <div className="p-8">
//       <Title level={3} className="text-white mb-6">Manage Students</Title>
//       <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="mb-4">
//         Add Student
//       </Button>
//       <Table
//         dataSource={students}
//         columns={columns}
//         rowKey="id"
//         className="rounded-lg overflow-hidden"
//         pagination={{ pageSize: 5 }}
//         style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//       />

//       <Modal
//         title={editingStudent ? "Edit Student" : "Add New Student"}
//         visible={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editingStudent ? "Update" : "Add"}
//         cancelText="Cancel"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter student name!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="grade" label="Grade" rules={[{ required: true, message: 'Please enter student grade!' }]}>
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// const AssignmentsData = () => {
//   const [assignments, setAssignments] = useState(mockAssignments);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingAssignment, setEditingAssignment] = useState(null);
//   const [form] = Form.useForm();

//   const columns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Group', dataIndex: 'group', key: 'group', render: (text) => <Tag color="blue">{text}</Tag> },
//     { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', render: (text) => dayjs(text).format('YYYY-MM-DD') },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
//         </Space>
//       ),
//     },
//   ];

//   const handleAdd = () => {
//     setEditingAssignment(null);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

//   const handleEdit = (assignment) => {
//     setEditingAssignment(assignment);
//     form.setFieldsValue({ ...assignment, dueDate: dayjs(assignment.dueDate) });
//     setIsModalVisible(true);
//   };

//   const handleDelete = (id) => {
//     Modal.confirm({
//       title: 'Confirm Delete',
//       content: 'Are you sure you want to delete this assignment?',
//       onOk: () => {
//         setAssignments(assignments.filter(a => a.id !== id));
//         Modal.success({ title: 'Success', content: 'Assignment deleted successfully.' });
//       },
//     });
//   };

//   const handleModalOk = () => {
//     form.validateFields()
//       .then(values => {
//         const newAssignment = {
//           ...values,
//           dueDate: values.dueDate.format('YYYY-MM-DD'),
//           id: editingAssignment ? editingAssignment.id : `a${assignments.length + 1}`,
//           submitted: editingAssignment ? editingAssignment.submitted : false, // Preserve submitted status or set to false for new
//         };

//         if (editingAssignment) {
//           setAssignments(assignments.map(a => a.id === editingAssignment.id ? newAssignment : a));
//           Modal.success({ title: 'Success', content: 'Assignment updated successfully.' });
//         } else {
//           setAssignments([...assignments, newAssignment]);
//           Modal.success({ title: 'Success', content: 'Assignment added successfully.' });
//         }
//         setIsModalVisible(false);
//       })
//       .catch(info => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   return (
//     <div className="p-8">
//       <Title level={3} className="text-white mb-6">Manage Assignments</Title>
//       <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="mb-4">
//         Add Assignment
//       </Button>
//       <Table
//         dataSource={assignments}
//         columns={columns}
//         rowKey="id"
//         className="rounded-lg overflow-hidden"
//         pagination={{ pageSize: 5 }}
//         style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//       />

//       <Modal
//         title={editingAssignment ? "Edit Assignment" : "Add New Assignment"}
//         visible={isModalVisible}
//         onOk={handleModalOk}
//         onCancel={() => setIsModalVisible(false)}
//         okText={editingAssignment ? "Update" : "Add"}
//         cancelText="Cancel"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Assignment Name" rules={[{ required: true, message: 'Please enter assignment name!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description!' }]}>
//             <Input.TextArea rows={4} />
//           </Form.Item>
//           <Form.Item name="group" label="Group" rules={[{ required: true, message: 'Please select a group!' }]}>
//             <Select placeholder="Select a group">
//               {mockAssignmentGroups.map(group => (
//                 <Option key={group.id} value={group.name}>{group.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Please select a due date!' }]}>
//             <DatePicker className="w-full" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// const SubmissionsData = () => {
//   const [submissions, setSubmissions] = useState(mockSubmissions);

//   const getAssignmentName = (assignmentId) => {
//     const assignment = mockAssignments.find(a => a.id === assignmentId);
//     return assignment ? assignment.name : 'N/A';
//   };

//   const getStudentName = (studentId) => {
//     const student = mockStudents.find(s => s.id === studentId);
//     return student ? student.name : 'N/A';
//   };

//   const columns = [
//     { title: 'Assignment', dataIndex: 'assignmentId', key: 'assignmentId', render: (id) => getAssignmentName(id) },
//     { title: 'Student', dataIndex: 'studentId', key: 'studentId', render: (id) => getStudentName(id) },
//     { title: 'Type', dataIndex: 'submissionType', key: 'submissionType', render: (text) => <Tag color={text === 'file' ? 'geekblue' : 'purple'}>{text.toUpperCase()}</Tag> },
//     {
//       title: 'Content',
//       dataIndex: 'submissionContent',
//       key: 'submissionContent',
//       render: (text, record) => (
//         record.submissionType === 'link' ? (
//           <Tooltip title={text}>
//             <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//               <LinkOutlined /> View Link
//             </a>
//           </Tooltip>
//         ) : (
//           <Tooltip title={text}>
//             <Text className="text-gray-300">
//               <PaperClipOutlined /> {text}
//             </Text>
//           </Tooltip>
//         )
//       ),
//     },
//     { title: 'Date', dataIndex: 'submissionDate', key: 'submissionDate', render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm') },
//     { title: 'Status', dataIndex: 'status', key: 'status', render: (text) => <Tag color={text === 'Graded' ? 'green' : 'volcano'}>{text}</Tag> },
//     { title: 'Grade', dataIndex: 'grade', key: 'grade', render: (text) => text || '-' },
//   ];

//   return (
//     <div className="p-8">
//       <Title level={3} className="text-white mb-6">View Submissions</Title>
//       <Table
//         dataSource={submissions}
//         columns={columns}
//         rowKey="id"
//         className="rounded-lg overflow-hidden"
//         pagination={{ pageSize: 5 }}
//         style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//       />
//     </div>
//   );
// };

// const AdminPage = () => {
//   const [adminSubPage, setAdminSubPage] = useState('dashboard');
//   const [collapsed, setCollapsed] = useState(true); // Start collapsed

//   const handleAdminMenuClick = (e) => {
//     setAdminSubPage(e.key);
//     // setCollapsed(true); // Collapse sidebar after selection
//   };

//   const renderAdminSubPage = () => {
//     switch (adminSubPage) {
//       case 'dashboard':
//         return <AdminDashboard />;
//       case 'students':
//         return <StudentsData />;
//       case 'assignments':
//         return <AssignmentsData />;
//       case 'submissions':
//         return <SubmissionsData />;
//       default:
//         return <AdminDashboard />;
//     }
//   };

//   return (
//     <Layout className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--ant-color-bg-layout)' }}>
//       {/* Sider for Admin Menu */}
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         trigger={null}
//         /* onCollapse={setCollapsed}
//         width={250}
//         collapsedWidth={0}
//         style={{
//           overflow: 'auto',
//           height: '100vh',
//           position: 'fixed',
//           left: 0,
//           top: 64, // Adjust based on Header height
//           zIndex: 1000,
//           backgroundColor: 'var(--ant-color-bg-container)',
//           borderRight: '1px solid rgba(255, 255, 255, 0.1)',
//           transition: 'all 0.2s',
//           transform: collapsed ? 'translateX(-100%)' : 'translateX(0%)', // Slide in/out
//         }} */
//       >
//         {/* <div className="p-4">
//           <Title level={4} className="text-white mb-4 text-center">Admin Menu</Title>
//         </div> */}
//         <Menu
//           theme="dark"
//           mode="inline"
//           collapsed={collapsed} // Pass collapsed state to Menu
//           selectedKeys={[adminSubPage]}
//           onClick={handleAdminMenuClick}
//           items={[
//             { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
//             { key: 'students', icon: <UserOutlined />, label: 'Students Data' },
//             { key: 'assignments', icon: <FileTextOutlined />, label: 'Assignments Data' },
//             { key: 'submissions', icon: <SendOutlined />, label: 'Submissions' },
//           ]}
//           style={{ backgroundColor: 'var(--ant-color-bg-container)' }}
//         />
//       </Sider>

//       {/* Main content area - no margin-left adjustment */}
//       <Layout style={{ minHeight: '100%' }}>
//         <Header  className="p-6">
//           {/* Toggle button for the Sider */}
//           <Button
//             type="primary"
//             icon={collapsed ? <MenuOutlined /> : <LeftOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             // style={{
//             //   position: 'fixed',
//             //   top: 80,
//             //   left: collapsed ? 20 : 270,
//             //   zIndex: 1001,
//             //   transition: 'all 0.2s',
//             // }}
//           />
//         </Header>
//         <Content className="p-6">
//           {renderAdminSubPage()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// --- Main App Component ---
/* const Home = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentMenuKey, setCurrentMenuKey] = useState('1');

  const handleMenuClick = (e) => {
    setCurrentMenuKey(e.key);
    switch (e.key) {
      case '1':
        setCurrentPage('landing');
        break;
      case '2':
        setCurrentPage('submission');
        break;
      case '3':
        setCurrentPage('admin');
        break;
      default:
        setCurrentPage('landing');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'submission':
        return <SubmissionPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <LandingPage />;
    }
  };

  // Set up responsive height for content
  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector('.ant-layout-header')?.offsetHeight || 0;
      const footerHeight = document.querySelector('.ant-layout-footer')?.offsetHeight || 0;
      const contentElement = document.querySelector('.ant-layout-content');
      if (contentElement) {
        contentElement.style.minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
      }
      const siteLayoutContent = document.querySelector('.site-layout-content');
      if (siteLayoutContent) {
        siteLayoutContent.style.minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px - 48px)`;
      }
    };

    updateContentHeight();
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorTextBase: '#f0f2f5',
          colorBgContainer: '#141414',
          colorBgLayout: '#001529',
          colorBorderSecondary: 'rgba(255, 255, 255, 0.1)',
        },
        components: {
          Layout: {
            headerBg: '#001529',
            footerBg: '#001529',
          },
          Menu: {
            darkItemBg: '#001529',
            darkSubMenuItemBg: '#001529',
            darkItemHoverBg: '#1890ff',
            darkItemSelectedBg: '#1890ff',
            darkItemColor: 'rgba(255, 255, 255, 0.65)',
            darkItemSelectedColor: '#fff',
          },
          Button: {
            colorPrimary: '#1890ff',
            colorText: '#f0f2f5',
          },
          Typography: {
            colorTextHeading: '#fff',
            colorText: '#f0f2f5',
          },
          Card: {
            headerBg: 'rgba(255, 255, 255, 0.05)',
            actionsBg: 'rgba(255, 255, 255, 0.05)',
            extraColor: 'rgba(255, 255, 255, 0.65)',
          },
          Table: {
            headerBg: 'rgba(255, 255, 255, 0.05)',
            headerColor: '#f0f2f5',
            bodyBg: 'var(--ant-color-bg-container)',
            rowHoverBg: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            footerBg: 'rgba(255, 255, 255, 0.05)',
          },
          Modal: {
            contentBg: 'var(--ant-color-bg-container)',
            headerBg: 'var(--ant-color-bg-container)',
            titleColor: '#fff',
            footerBg: 'var(--ant-color-bg-container)',
          },
          Input: {
            activeBorderColor: '#1890ff',
            hoverBorderColor: '#1890ff',
            activeShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
          },
          Select: {
            optionSelectedBg: 'rgba(24, 144, 255, 0.2)',
            optionActiveBg: 'rgba(255, 255, 255, 0.08)',
            optionSelectedColor: '#1890ff',
          },
          DatePicker: {
            activeBorderColor: '#1890ff',
            hoverBorderColor: '#1890ff',
            activeShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
          },
          Upload: {
            colorFillAlter: 'rgba(255, 255, 255, 0.05)',
            colorBorder: 'rgba(255, 255, 255, 0.15)',
            colorText: 'rgba(255, 255, 255, 0.85)',
            colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
          },
          Statistic: {
            colorText: '#f0f2f5',
            colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="flex items-center" style={{ padding: '0 20px' }}>
          <Title level={3} style={{ color: 'white', margin: 0, marginRight: 'auto' }}>
            Assignment App
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentMenuKey]}
            onClick={handleMenuClick}
            className="flex-grow justify-end"
            items={[
              { key: '1', icon: <HomeOutlined />, label: 'Home' },
              { key: '2', icon: <UploadOutlined />, label: 'Submit' },
              { key: '3', icon: <SettingOutlined />, label: 'Admin' },
            ]}
            style={{ minWidth: 0, flex: 'auto' }}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div
            className="site-layout-content"
            style={{
              background: 'var(--ant-color-bg-container)',
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              borderRadius: '8px',
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: currentPage === 'landing' ? 'center' : 'flex-start',
              alignItems: currentPage === 'landing' ? 'center' : 'stretch',
            }}
          >
            {renderPage()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.65)' }}>
          Assignment App ©{new Date().getFullYear()} Created by Gemini
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Home; */

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

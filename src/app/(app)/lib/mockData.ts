

// --- Mock Data ---

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
}
export const mockEvents = [
  {
    id: "e1",
    name: "Annual Science Fair 2025",
    description: "Showcase your scientific innovations and research!",
    date: "2025-09-15",
  },
  {
    id: "e2",
    name: "Creative Writing Contest",
    description: "Unleash your imagination and pen down captivating stories.",
    date: "2025-10-30",
  },
  {
    id: "e3",
    name: "Mathematics Olympiad",
    description:
      "Challenge your problem-solving skills in advanced mathematics.",
    date: "2025-11-20",
  },
];

// export interface AssignmentGroup {
//   id: number;
//   name: string;
// }

export interface AssignmentGroup {
  id: number;
  name: string;
  is_active: boolean;
  created_at: number;
}

export const mockAssignmentGroups = [
  { id: 0, name: "Science Projects" },
  { id: 1, name: "Literature Essays" },
  { id: 2, name: "Math Problems" },
  { id: 3, name: "History Research" },
];

/* export interface Assignment {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  group: number;
  submitted: boolean;
} */

export interface Assignment {
  id: number;
  name: string;
  description: string;
  due: Date;
  active: boolean;
  is_link: boolean;
  task_group_id?: number;
  created_at: number;
}

export const mockAssignments = [
  {
    id: 1,
    name: "Physics Experiment Report",
    description:
      "Design and conduct an experiment, then write a detailed report.",
    dueDate: "2025-09-10",
    group: 0,
    submitted: false,
  },
  {
    id: 2,
    name: "Chemistry Lab Analysis",
    description: "Analyze given chemical data and present your findings.",
    dueDate: "2025-09-25",
    group: 0,
    submitted: false,
  },
  {
    id: 3,
    name: 'Literary Analysis: "1984"',
    description: 'Write an essay analyzing themes in George Orwell\'s "1984".',
    dueDate: "2025-10-20",
    group: 1,
    submitted: false,
  },
  {
    id: 4,
    name: "Poetry Collection",
    description: "Submit a collection of 5 original poems.",
    dueDate: "2025-10-28",
    group: 1,
    submitted: false,
  },
  {
    id: 5,
    name: "Algebraic Equations",
    description: "Solve a set of complex algebraic equations.",
    dueDate: "2025-11-15",
    group: 2,
    submitted: false,
  },
  {
    id: 6,
    name: "Geometry Proofs",
    description: "Prove various geometric theorems.",
    dueDate: "2025-11-18",
    group: 2,
    submitted: false,
  },
  {
    id: 7,
    name: "World War II Impact",
    description: "Research and write an essay on the long-term impact of WWII.",
    dueDate: "2025-11-05",
    group: 3,
    submitted: false,
  },
];

export const numAssignment = mockAssignments.length

export interface StudentData {
  id: number;
  nim: string;
  nama: string;
  email: string;
  kelompok: string;
  is_admin: boolean;
  email_verified_at: Date;
  hased_password: string;
  created_at: number;
}

// export const mockStudents: Student[] = [
//   { id: 1, name: "Alice Smith", email: "alice@example.com", grade: "10" },
//   { id: 2, name: "Bob Johnson", email: "bob@example.com", grade: "11" },
// ];

// export const numStudent = createClient().then(supabase => supabase.from('users').select('id').then(res => res.data?.length))


export interface Submission {
  id: number;
  name: string;
  path?: string;
  link?: string;
  user_id: number;
  sub_task_id?: number;
  created_at: number;
}

export const mockSubmissions = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    submissionType: "file",
    submissionContent: "report_alice_a1.pdf",
    submissionDate: "2025-09-08",
    status: "Pending Review",
  },
  {
    id: 2,
    assignmentId: 3,
    studentId: 2,
    submissionType: "link",
    submissionContent: "https://docs.google.com/document/d/essay_bob",
    submissionDate: "2025-10-18",
    status: "Graded",
    grade: "A-",
  },
];

export const numSubmission = mockSubmissions.length
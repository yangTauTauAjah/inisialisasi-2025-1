/**
 * Role-Based Activity Testing Framework
 * 
 * This file defines all activities available to each role in the submission app
 * and provides a foundation for testing each activity.
 */

export interface Activity {
  id: string;
  name: string;
  description: string;
  route?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requiresAuth: boolean;
  requiresAdmin: boolean;
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  expectedStatus: number;
  expectedBehavior: string;
  route?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const UNAUTHENTICATED_USER_ACTIVITIES: Activity[] = [
  {
    id: 'view-landing-page',
    name: 'View Landing Page',
    description: 'Access the main landing page with hero, about, guidelines, outfit, and criteria sections',
    route: '/',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'landing-page-loads',
        name: 'Landing page loads successfully',
        description: 'Landing page should load without authentication',
        expectedStatus: 200,
        expectedBehavior: 'Page loads with all sections visible'
      },
      {
        id: 'landing-page-sections',
        name: 'All landing page sections are present',
        description: 'Hero, About, Guidelines, Outfit, and Criteria sections should be visible',
        expectedStatus: 200,
        expectedBehavior: 'All sections render correctly'
      }
    ]
  },
  {
    id: 'view-announcement',
    name: 'View Announcement Page',
    description: 'Access the announcement page with guidelines and rules',
    route: '/announcement',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'announcement-page-loads',
        name: 'Announcement page loads successfully',
        description: 'Announcement page should load without authentication',
        expectedStatus: 200,
        expectedBehavior: 'Page loads with guidelines image'
      }
    ]
  },
  {
    id: 'view-assignments',
    name: 'View All Assignments',
    description: 'Browse assignment list organized by days/groups',
    route: '/assignment',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'assignments-page-loads',
        name: 'Assignments page loads successfully',
        description: 'Assignments page should load without authentication',
        expectedStatus: 200,
        expectedBehavior: 'Page loads with assignment list'
      },
      {
        id: 'assignments-api-accessible',
        name: 'Assignments API is accessible',
        description: 'GET /api/data/assignments should return assignment data',
        expectedStatus: 200,
        expectedBehavior: 'Returns JSON array of assignments'
      }
    ]
  },
  {
    id: 'view-assignment-details',
    name: 'View Assignment Details',
    description: 'Click on individual assignments to see full details',
    route: '/assignment',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'assignment-details-visible',
        name: 'Assignment details are visible',
        description: 'Clicking on assignment should show detailed view',
        expectedStatus: 200,
        expectedBehavior: 'Assignment detail view renders correctly'
      }
    ]
  },
  {
    id: 'access-login-pages',
    name: 'Access Login Pages',
    description: 'Navigate to authentication pages',
    route: '/auth',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'student-login-page-loads',
        name: 'Student login page loads',
        description: '/auth should be accessible without authentication',
        expectedStatus: 200,
        expectedBehavior: 'Login form is visible'
      },
      {
        id: 'admin-login-page-loads',
        name: 'Admin login page loads',
        description: '/adminLogin should be accessible without authentication',
        expectedStatus: 200,
        expectedBehavior: 'Admin login form is visible'
      }
    ]
  },
  {
    id: 'view-navigation',
    name: 'View Navigation Menu',
    description: 'Access to main navigation elements',
    route: '/',
    method: 'GET',
    requiresAuth: false,
    requiresAdmin: false,
    testCases: [
      {
        id: 'navigation-visible',
        name: 'Navigation menu is visible',
        description: 'Main navigation should be present on landing page',
        expectedStatus: 200,
        expectedBehavior: 'Navigation menu renders correctly'
      }
    ]
  }
];

export const REGULAR_STUDENT_ACTIVITIES: Activity[] = [
  // Inherit all unauthenticated user activities
  ...UNAUTHENTICATED_USER_ACTIVITIES.map(activity => ({
    ...activity,
    id: `student-${activity.id}`,
    name: `Student: ${activity.name}`,
    description: `Regular student can ${activity.description.toLowerCase()}`,
    requiresAuth: true,
    requiresAdmin: false
  })),
  {
    id: 'submit-assignments',
    name: 'Submit Assignments',
    description: 'Create new submissions via file upload or link submission',
    route: '/api/data/submissions',
    method: 'POST',
    requiresAuth: true,
    requiresAdmin: false,
    testCases: [
      {
        id: 'file-submission-success',
        name: 'File submission succeeds',
        description: 'Authenticated student can submit file-based assignments',
        expectedStatus: 201,
        expectedBehavior: 'File submission is created successfully'
      },
      {
        id: 'link-submission-success',
        name: 'Link submission succeeds',
        description: 'Authenticated student can submit link-based assignments',
        expectedStatus: 201,
        expectedBehavior: 'Link submission is created successfully'
      },
      {
        id: 'submission-requires-auth',
        name: 'Submission requires authentication',
        description: 'Unauthenticated users cannot submit assignments',
        expectedStatus: 401,
        expectedBehavior: 'Returns unauthorized error'
      }
    ]
  },
  {
    id: 'view-personal-submissions',
    name: 'View Personal Submission History',
    description: 'Access to their own submissions',
    route: '/api/data/submissions',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: false,
    testCases: [
      {
        id: 'submissions-api-accessible',
        name: 'Submissions API is accessible',
        description: 'Authenticated students can access submissions data',
        expectedStatus: 200,
        expectedBehavior: 'Returns submissions data'
      }
    ]
  },
  {
    id: 'logout',
    name: 'Logout',
    description: 'End session and return to unauthenticated state',
    route: '/api/auth/logout',
    method: 'DELETE',
    requiresAuth: true,
    requiresAdmin: false,
    testCases: [
      {
        id: 'logout-success',
        name: 'Logout succeeds',
        description: 'Authenticated user can logout successfully',
        expectedStatus: 200,
        expectedBehavior: 'Session is cleared and user is redirected'
      }
    ]
  },
  {
    id: 'access-assignment-interface',
    name: 'Access Assignment Interface',
    description: 'Full access to assignment browsing and submission features',
    route: '/assignment',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: false,
    testCases: [
      {
        id: 'assignment-interface-full-access',
        name: 'Full assignment interface access',
        description: 'Authenticated students have full access to assignment features',
        expectedStatus: 200,
        expectedBehavior: 'All assignment features are available'
      }
    ]
  }
];

export const ADMIN_ACTIVITIES: Activity[] = [
  // Inherit all regular student activities
  ...REGULAR_STUDENT_ACTIVITIES.map(activity => ({
    ...activity,
    id: `admin-${activity.id}`,
    name: `Admin: ${activity.name}`,
    description: `Admin can ${activity.description.toLowerCase()}`,
    requiresAuth: true,
    requiresAdmin: true
  })),
  {
    id: 'admin-dashboard',
    name: 'Access Admin Dashboard',
    description: 'View statistics (total students, assignments, submissions)',
    route: '/admin',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'admin-dashboard-loads',
        name: 'Admin dashboard loads',
        description: 'Admin dashboard should load for admin users',
        expectedStatus: 200,
        expectedBehavior: 'Dashboard with statistics is visible'
      },
      {
        id: 'admin-dashboard-protected',
        name: 'Admin dashboard is protected',
        description: 'Non-admin users cannot access admin dashboard',
        expectedStatus: 302,
        expectedBehavior: 'Redirected to home page'
      }
    ]
  },
  {
    id: 'manage-assignments',
    name: 'Manage Assignments',
    description: 'CRUD operations for assignments',
    route: '/admin/assignments',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'assignments-management-page-loads',
        name: 'Assignments management page loads',
        description: 'Admin can access assignments management interface',
        expectedStatus: 200,
        expectedBehavior: 'Assignments management table is visible'
      },
      {
        id: 'create-assignment',
        name: 'Create new assignment',
        description: 'Admin can create new assignments',
        route: '/api/data/assignments',
        method: 'POST',
        expectedStatus: 201,
        expectedBehavior: 'New assignment is created successfully'
      },
      {
        id: 'update-assignment',
        name: 'Update existing assignment',
        description: 'Admin can update assignments',
        route: '/api/data/assignments/[id]',
        method: 'PUT',
        expectedStatus: 200,
        expectedBehavior: 'Assignment is updated successfully'
      },
      {
        id: 'delete-assignment',
        name: 'Delete assignment',
        description: 'Admin can delete assignments without submissions',
        route: '/api/data/assignments/[id]',
        method: 'DELETE',
        expectedStatus: 200,
        expectedBehavior: 'Assignment is deleted successfully'
      }
    ]
  },
  {
    id: 'manage-assignment-groups',
    name: 'Manage Assignment Groups',
    description: 'CRUD operations for assignment groups',
    route: '/admin/assignments',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'assignment-groups-visible',
        name: 'Assignment groups table is visible',
        description: 'Admin can see assignment groups management table',
        expectedStatus: 200,
        expectedBehavior: 'Assignment groups table renders correctly'
      },
      {
        id: 'create-assignment-group',
        name: 'Create new assignment group',
        description: 'Admin can create new assignment groups',
        route: '/api/data/assignmentGroups',
        method: 'POST',
        expectedStatus: 201,
        expectedBehavior: 'New assignment group is created successfully'
      },
      {
        id: 'toggle-group-status',
        name: 'Toggle group active status',
        description: 'Admin can toggle assignment group active/inactive status',
        route: '/api/data/assignmentGroups/[id]/toggleActive',
        method: 'PUT',
        expectedStatus: 200,
        expectedBehavior: 'Group status is toggled successfully'
      },
      {
        id: 'delete-assignment-group',
        name: 'Delete assignment group',
        description: 'Admin can delete assignment groups',
        route: '/api/data/assignmentGroups/[id]',
        method: 'DELETE',
        expectedStatus: 200,
        expectedBehavior: 'Assignment group is deleted successfully'
      }
    ]
  },
  {
    id: 'view-all-students',
    name: 'View All Students',
    description: 'Browse complete student list with details',
    route: '/admin/students',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'students-page-loads',
        name: 'Students management page loads',
        description: 'Admin can access students list',
        expectedStatus: 200,
        expectedBehavior: 'Students table is visible with all student data'
      },
      {
        id: 'students-api-accessible',
        name: 'Students API is accessible',
        description: 'Admin can access students data via API',
        route: '/api/data/students',
        method: 'GET',
        expectedStatus: 200,
        expectedBehavior: 'Returns JSON array of all students'
      }
    ]
  },
  {
    id: 'view-all-submissions',
    name: 'View All Submissions',
    description: 'Browse all submissions with download and view capabilities',
    route: '/admin/submissions',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'submissions-page-loads',
        name: 'Submissions management page loads',
        description: 'Admin can access all submissions',
        expectedStatus: 200,
        expectedBehavior: 'Submissions table is visible with all submission data'
      },
      {
        id: 'download-submitted-files',
        name: 'Download submitted files',
        description: 'Admin can download submitted files',
        expectedStatus: 200,
        expectedBehavior: 'File download functionality works correctly'
      },
      {
        id: 'view-submission-links',
        name: 'View submission links',
        description: 'Admin can view and access submission links',
        expectedStatus: 200,
        expectedBehavior: 'Submission links are accessible'
      }
    ]
  },
  {
    id: 'admin-routes-protected',
    name: 'Admin Routes Protection',
    description: 'All /admin/* routes are protected and admin-only',
    route: '/admin',
    method: 'GET',
    requiresAuth: true,
    requiresAdmin: true,
    testCases: [
      {
        id: 'admin-routes-require-admin',
        name: 'Admin routes require admin privileges',
        description: 'Non-admin users cannot access any admin routes',
        expectedStatus: 302,
        expectedBehavior: 'Redirected to home page'
      },
      {
        id: 'admin-routes-require-auth',
        name: 'Admin routes require authentication',
        description: 'Unauthenticated users cannot access admin routes',
        expectedStatus: 302,
        expectedBehavior: 'Redirected to home page'
      }
    ]
  }
];

export const ALL_ACTIVITIES = {
  unauthenticated: UNAUTHENTICATED_USER_ACTIVITIES,
  regularStudent: REGULAR_STUDENT_ACTIVITIES,
  admin: ADMIN_ACTIVITIES
};

export const ROLE_SUMMARY = {
  unauthenticated: {
    name: 'Unauthenticated User',
    totalActivities: UNAUTHENTICATED_USER_ACTIVITIES.length,
    activities: UNAUTHENTICATED_USER_ACTIVITIES.map(a => a.name)
  },
  regularStudent: {
    name: 'Regular Student',
    totalActivities: REGULAR_STUDENT_ACTIVITIES.length,
    activities: REGULAR_STUDENT_ACTIVITIES.map(a => a.name)
  },
  admin: {
    name: 'Admin',
    totalActivities: ADMIN_ACTIVITIES.length,
    activities: ADMIN_ACTIVITIES.map(a => a.name)
  }
};

// Helper function to get activities by role
export function getActivitiesByRole(role: 'unauthenticated' | 'regularStudent' | 'admin'): Activity[] {
  return ALL_ACTIVITIES[role];
}

// Helper function to get all test cases for a role
export function getTestCasesByRole(role: 'unauthenticated' | 'regularStudent' | 'admin'): TestCase[] {
  const activities = getActivitiesByRole(role);
  return activities.flatMap(activity => activity.testCases);
}

// Helper function to validate role permissions
export function validateRolePermissions(
  userRole: 'unauthenticated' | 'regularStudent' | 'admin',
  activityId: string
): boolean {
  const activities = getActivitiesByRole(userRole);
  return activities.some(activity => activity.id === activityId);
}

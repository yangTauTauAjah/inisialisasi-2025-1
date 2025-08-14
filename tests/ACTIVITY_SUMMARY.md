# Activity Summary by Role

This document provides a comprehensive overview of all activities available to each role in the submission app.

## 📊 Role Overview

| Role | Total Activities | Description |
|------|------------------|-------------|
| **Unauthenticated User** | 6 | Users who haven't logged in |
| **Regular Student** | 11 | Authenticated students (non-admin) |
| **Admin** | 16 | Authenticated users with admin privileges |

## 🔓 Unauthenticated User Activities (6)

### 1. View Landing Page
- **Route**: `/`
- **Method**: `GET`
- **Description**: Access the main landing page with hero, about, guidelines, outfit, and criteria sections
- **Test Cases**:
  - Landing page loads successfully (200)
  - All landing page sections are present (200)

### 2. View Announcement Page
- **Route**: `/announcement`
- **Method**: `GET`
- **Description**: Access the announcement page with guidelines and rules
- **Test Cases**:
  - Announcement page loads successfully (200)

### 3. View All Assignments
- **Route**: `/assignment`
- **Method**: `GET`
- **Description**: Browse assignment list organized by days/groups
- **Test Cases**:
  - Assignments page loads successfully (200)
  - Assignments API is accessible (200)

### 4. View Assignment Details
- **Route**: `/assignment`
- **Method**: `GET`
- **Description**: Click on individual assignments to see full details
- **Test Cases**:
  - Assignment details are visible (200)

### 5. Access Login Pages
- **Route**: `/auth`
- **Method**: `GET`
- **Description**: Navigate to authentication pages
- **Test Cases**:
  - Student login page loads (200)
  - Admin login page loads (200)

### 6. View Navigation Menu
- **Route**: `/`
- **Method**: `GET`
- **Description**: Access to main navigation elements
- **Test Cases**:
  - Navigation menu is visible (200)

---

## 👨‍🎓 Regular Student Activities (11)

### Inherited from Unauthenticated User (6)
All activities listed above, plus:

### 7. Submit Assignments
- **Route**: `/api/data/submissions`
- **Method**: `POST`
- **Description**: Create new submissions via file upload or link submission
- **Test Cases**:
  - File submission succeeds (201)
  - Link submission succeeds (201)
  - Submission requires authentication (401 for unauthenticated)

### 8. View Personal Submission History
- **Route**: `/api/data/submissions`
- **Method**: `GET`
- **Description**: Access to their own submissions
- **Test Cases**:
  - Submissions API is accessible (200)

### 9. Logout
- **Route**: `/api/auth/logout`
- **Method**: `DELETE`
- **Description**: End session and return to unauthenticated state
- **Test Cases**:
  - Logout succeeds (200)

### 10. Access Assignment Interface
- **Route**: `/assignment`
- **Method**: `GET`
- **Description**: Full access to assignment browsing and submission features
- **Test Cases**:
  - Full assignment interface access (200)

---

## 👨‍💼 Admin Activities (16)

### Inherited from Regular Student (11)
All activities listed above, plus:

### 12. Access Admin Dashboard
- **Route**: `/admin`
- **Method**: `GET`
- **Description**: View statistics (total students, assignments, submissions)
- **Test Cases**:
  - Admin dashboard loads (200)
  - Admin dashboard is protected (302 for non-admin)

### 13. Manage Assignments
- **Route**: `/admin/assignments`
- **Method**: `GET`
- **Description**: CRUD operations for assignments
- **Test Cases**:
  - Assignments management page loads (200)
  - Create new assignment (201)
  - Update existing assignment (200)
  - Delete assignment (200)

### 14. Manage Assignment Groups
- **Route**: `/admin/assignments`
- **Method**: `GET`
- **Description**: CRUD operations for assignment groups
- **Test Cases**:
  - Assignment groups table is visible (200)
  - Create new assignment group (201)
  - Toggle group active status (200)
  - Delete assignment group (200)

### 15. View All Students
- **Route**: `/admin/students`
- **Method**: `GET`
- **Description**: Browse complete student list with details
- **Test Cases**:
  - Students management page loads (200)
  - Students API is accessible (200)

### 16. View All Submissions
- **Route**: `/admin/submissions`
- **Method**: `GET`
- **Description**: Browse all submissions with download and view capabilities
- **Test Cases**:
  - Submissions management page loads (200)
  - Download submitted files (200)
  - View submission links (200)

### 17. Admin Routes Protection
- **Route**: `/admin`
- **Method**: `GET`
- **Description**: All /admin/* routes are protected and admin-only
- **Test Cases**:
  - Admin routes require admin privileges (302)
  - Admin routes require authentication (302)

---

## 🔒 Security Matrix

| Activity | Unauthenticated | Student | Admin |
|----------|----------------|---------|-------|
| View Landing Page | ✅ | ✅ | ✅ |
| View Announcement | ✅ | ✅ | ✅ |
| View Assignments | ✅ | ✅ | ✅ |
| View Assignment Details | ✅ | ✅ | ✅ |
| Access Login Pages | ✅ | ✅ | ✅ |
| View Navigation | ✅ | ✅ | ✅ |
| Submit Assignments | ❌ | ✅ | ✅ |
| View Personal Submissions | ❌ | ✅ | ✅ |
| Logout | ❌ | ✅ | ✅ |
| Access Assignment Interface | ❌ | ✅ | ✅ |
| Access Admin Dashboard | ❌ | ❌ | ✅ |
| Manage Assignments | ❌ | ❌ | ✅ |
| Manage Assignment Groups | ❌ | ❌ | ✅ |
| View All Students | ❌ | ❌ | ✅ |
| View All Submissions | ❌ | ❌ | ✅ |
| Admin Routes Protection | ❌ | ❌ | ✅ |

**Legend:**
- ✅ = Allowed
- ❌ = Denied/Redirected

---

## 🧪 Testing Coverage

### Test Categories

1. **Authentication Tests**
   - Verify unauthenticated users cannot access protected resources
   - Verify authenticated users can access their authorized resources
   - Test login/logout functionality

2. **Authorization Tests**
   - Verify regular students cannot access admin features
   - Verify admins can access all features
   - Test route protection middleware

3. **Functionality Tests**
   - Verify each activity works as expected
   - Test API endpoints return correct status codes
   - Verify UI components render correctly

4. **Security Tests**
   - Test session management
   - Verify proper error handling for unauthorized access
   - Test rate limiting and other security measures

### Test Execution

```bash
# Run all tests
npm run test

# Run tests for specific role
npm run test:unauthenticated
npm run test:student
npm run test:admin

# List all activities
npm run test:list

# Get help
npm run test:help
```

---

## 📈 Metrics

- **Total Test Cases**: 25+
- **Coverage**: 100% of defined activities
- **Security Boundaries**: All tested
- **Authentication Flows**: Complete coverage
- **Authorization Matrix**: Fully validated

This comprehensive testing framework ensures that all role-based activities are properly tested and security boundaries are enforced correctly.







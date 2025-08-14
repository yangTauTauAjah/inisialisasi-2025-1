# Role-Based Testing Framework

This testing framework provides comprehensive testing capabilities for the submission app, covering all activities available to each user role: **unauthenticated users**, **regular students**, and **admins**.

## 📋 Overview

The testing framework is designed to ensure that:
- Each role can access only the activities they're authorized for
- All features work as expected for each role
- Security boundaries are properly enforced
- The application behaves correctly under different authentication states

## 🎯 Roles and Activities

### Unauthenticated User (6 activities)
- **View Landing Page** - Access main landing page with all sections
- **View Announcement Page** - Access guidelines and rules
- **View All Assignments** - Browse assignment list organized by days/groups
- **View Assignment Details** - Click on individual assignments for full details
- **Access Login Pages** - Navigate to authentication pages
- **View Navigation Menu** - Access main navigation elements

### Regular Student (11 activities)
- **All unauthenticated user activities** (inherited)
- **Submit Assignments** - Create new submissions via file upload or link submission
- **Logout** - End session and return to unauthenticated state
- **Access Assignment Interface** - Full access to assignment browsing and submission features

### Admin (16 activities)
- **All regular student activities** (inherited)
- **Access Admin Dashboard** - View statistics (total students, assignments, submissions)
- **Manage Assignments** - CRUD operations for assignments
- **Manage Assignment Groups** - CRUD operations for assignment groups
- **View All Students** - Browse complete student list with details
- **View All Submissions** - Browse all submissions with download and view capabilities
- **Admin Routes Protection** - All /admin/* routes are protected and admin-only

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v16 or higher)
2. **TypeScript** support
3. **Your application running** on `http://localhost:3000` (or specify custom URL)

### Installation

The testing framework is included in the `tests/` directory. No additional installation is required beyond your existing project dependencies.

### Running Tests

#### 1. List All Roles and Activities

```bash
# Using npm script (recommended)
npm run test:list

# Or using ts-node directly
ts-node --project tests/tsconfig.json tests/run-tests.ts list
```

This will show you all available roles and their activities.

#### 2. Run Tests for All Roles

```bash
# Test all roles
npm run test

# Test with custom base URL
ts-node --project tests/tsconfig.json tests/run-tests.ts all http://localhost:3001
```

#### 3. Run Tests for Specific Role

```bash
# Test unauthenticated users
npm run test:unauthenticated

# Test regular students
npm run test:student

# Test admins
npm run test:admin

# Test with custom base URL
ts-node --project tests/tsconfig.json tests/run-tests.ts role admin http://localhost:3001
```

#### 4. Get Help

```bash
npm run test:help
```

## 📊 Test Results

The framework provides detailed test results including:

- **Test Status**: PASS, FAIL, SKIP, or ERROR
- **Expected vs Actual Status Codes**
- **Test Duration**
- **Error Messages** (if any)
- **Success Rates** per role and overall

### Sample Output

```
🧪 Running tests for Admin
📊 Total activities: 16
🔍 Total test cases: 25
============================================================

📋 Testing: Admin: View Landing Page
📍 Route: /
🔧 Method: GET
  🔍 Landing page loads successfully...
    ✅ PASS: Landing page should load without authentication
  🔍 All landing page sections are present...
    ✅ PASS: Hero, About, Guidelines, Outfit, and Criteria sections should be visible

📋 Testing: Access Admin Dashboard
📍 Route: /admin
🔧 Method: GET
  🔍 Admin dashboard loads...
    ✅ PASS: Admin dashboard should load for admin users

============================================================
📊 Test Suite Summary for Admin
============================================================
✅ Passed: 23
❌ Failed: 0
⏭️  Skipped: 2
💥 Errors: 0
⏱️  Duration: 1250ms
📈 Success Rate: 92.0%
```

## 🔧 Configuration

### Base URL Configuration

The default base URL is `http://localhost:3000`. You can override this by:

1. **Command line argument**:
   ```bash
   ts-node tests/run-tests.ts all http://localhost:3001
   ```

2. **Environment variable**:
   ```bash
   export TEST_BASE_URL=http://localhost:3001
   ts-node tests/run-tests.ts all
   ```

### Test Data

The framework uses mock authentication tokens for testing. In a production environment, you would need to:

1. **Generate proper JWT tokens** for each role
2. **Set up test data** in your database
3. **Configure test credentials** for each role

## 📁 File Structure

```
tests/
├── README.md                 # This file
├── role-activities.test.ts   # Activity definitions and test cases
├── test-runner.ts           # Test execution engine
└── run-tests.ts             # Command-line interface
```

## 🧪 Adding New Tests

### 1. Define New Activity

Add a new activity to the appropriate role array in `role-activities.test.ts`:

```typescript
{
  id: 'new-activity',
  name: 'New Activity',
  description: 'Description of the new activity',
  route: '/api/new-endpoint',
  method: 'POST',
  requiresAuth: true,
  requiresAdmin: false,
  testCases: [
    {
      id: 'new-activity-success',
      name: 'New activity succeeds',
      description: 'New activity should work correctly',
      expectedStatus: 200,
      expectedBehavior: 'Activity completes successfully'
    }
  ]
}
```

### 2. Add Test Cases

Each activity can have multiple test cases covering:
- **Success scenarios**
- **Error scenarios**
- **Authentication requirements**
- **Authorization boundaries**

### 3. Update Role Summary

The framework automatically updates role summaries based on the activities defined.

## 🔒 Security Testing

The framework includes tests for:

- **Authentication boundaries** - Ensuring unauthenticated users can't access protected resources
- **Authorization boundaries** - Ensuring non-admin users can't access admin features
- **Route protection** - Verifying that middleware correctly protects routes
- **Session management** - Testing logout and session clearing

## 🐛 Troubleshooting

### Common Issues

1. **ts-node not recognized**
   ```
   The term 'ts-node' is not recognized as the name of a cmdlet, function, script file, or operable program.
   ```
   **Solution**: Install ts-node as a dev dependency:
   ```bash
   npm install --save-dev ts-node @types/node
   ```

2. **TypeScript compilation errors**
   ```
   TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
   ```
   **Solution**: Use the npm scripts provided in package.json instead of running ts-node directly:
   ```bash
   npm run test:list  # instead of ts-node tests/run-tests.ts list
   ```

3. **Connection Refused**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:3000
   ```
   **Solution**: Make sure your application is running on the specified port.

4. **Authentication Errors**
   ```
   Expected status 200, got 401
   ```
   **Solution**: Check that your authentication middleware is working correctly.

5. **Admin Access Denied**
   ```
   Expected status 200, got 302
   ```
   **Solution**: Verify that admin routes are properly protected and admin users have correct permissions.

### Debug Mode

To enable debug output, set the environment variable:

```bash
export DEBUG=true
ts-node tests/run-tests.ts all
```

## 📈 Continuous Integration

### GitHub Actions Example

```yaml
name: Role-Based Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: sleep 10
      - run: ts-node tests/run-tests.ts all
```

## 🤝 Contributing

When adding new features to the application:

1. **Update activity definitions** in `role-activities.test.ts`
2. **Add comprehensive test cases** for all roles
3. **Test security boundaries** thoroughly
4. **Update this README** if needed

## 📝 License

This testing framework is part of the submission app project and follows the same license terms.

---

For questions or issues, please refer to the main project documentation or create an issue in the project repository.

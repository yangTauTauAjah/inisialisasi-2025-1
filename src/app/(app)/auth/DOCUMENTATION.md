# Authentication System Documentation

## Overview
This document describes the authentication system implementation for the INIS application. The system consists of three main components: Login, Activation, and Success states.

## File Structure
```
src/app/components/auth/
├── LoginForm.tsx          # Login form component
├── ActivationForm.tsx     # Account activation form
├── ActivationSuccess.tsx  # Success confirmation page
├── LogoIcon.tsx          # Icon components
└── README.md             # This documentation
```

## Components

### 1. LoginForm.tsx
**Purpose**: Handles user login with NIM and password.

**Features**:
- NIM input field
- Password input field
- Form validation
- API integration with `/api/auth/login`
- Ant Design message system for feedback
- Redirects to `/assignments` on success

**API Endpoint**: `POST /api/auth/login`
```json
{
  "nim": "string",
  "password": "string"
}
```

**Success Response**:
```json
{
  "message": "Login successful!"
}
```

**Error Responses**:
- `404`: "Student ID not found"
- `401`: "Incorrect password" or "Account not activated"
- `500`: Server errors

### 2. ActivationForm.tsx
**Purpose**: Handles account activation for new users.

**Features**:
- NIM input field
- Password input field (min 8 characters)
- Confirm password field
- Form validation (password matching, length)
- API integration with `/api/auth/confirm`
- Form reset after successful activation
- Shows ActivationSuccess component on success

**API Endpoint**: `POST /api/auth/confirm`
```json
{
  "nim": "string",
  "password": "string"
}
```

**Success Response**:
```json
{
  "message": "Password updated successfully! Please log in with your new password."
}
```

**Error Responses**:
- `404`: "Student ID not found"
- `401`: "Incorrect confirmation token" or "Already activated"
- `400`: "Password must be at least 8 characters"
- `500`: Server errors

### 3. ActivationSuccess.tsx
**Purpose**: Displays success message after account activation.

**Features**:
- Success icon with green glow effect
- Success message
- "Login Sekarang" button to return to login
- No API calls (static component)

## State Management

### Auth Page States
The main auth page (`src/app/(app)/auth/page.tsx`) manages three states:
1. **"login"** - Shows LoginForm
2. **"activation"** - Shows ActivationForm  
3. **"success"** - Shows ActivationSuccess

### State Transitions
```
LoginForm → ActivationForm (via "aktivasi akun" link)
ActivationForm → ActivationSuccess (on successful activation)
ActivationSuccess → LoginForm (via "Login Sekarang" button)
```

## API Integration

### Login Flow
1. User enters NIM and password
2. Form validates required fields
3. API call to `/api/auth/login`
4. On success: Sets session cookie, redirects to `/assignments`
5. On error: Shows error message

### Activation Flow
1. User enters NIM and new password
2. Form validates password requirements (min 8 chars, matching)
3. API call to `/api/auth/confirm`
4. On success: Resets form, shows success message, redirects to ActivationSuccess
5. On error: Shows error message

## UI/UX Features

### Visual Design
- Dark theme with blue accent colors
- Spotlight effect with rounded corners
- Glassmorphism design with backdrop blur
- Responsive layout

### Form Validation
- **Client-side**: Password matching, minimum length
- **Server-side**: NIM validation, token verification
- **User feedback**: Ant Design message system

### Loading States
- Button text changes to "Loading..." during API calls
- Loading messages shown during requests
- Disabled form during submission

## Error Handling

### Client-Side Errors
- Password mismatch
- Password too short (< 8 characters)
- Network errors
- Form validation errors

### Server-Side Errors
- Invalid NIM
- Incorrect password
- Account not activated
- Server errors

### Error Display
- Ant Design message system
- Auto-dismissing error messages
- Clear, user-friendly error text

## Security Considerations

### Password Requirements
- Minimum 8 characters
- Client and server-side validation
- Secure password hashing (handled by backend)

### Session Management
- JWT tokens for authentication
- Secure cookie storage
- Automatic session expiration

### Form Security
- CSRF protection (handled by Next.js)
- Input sanitization
- Secure API communication

## Backend Requirements

### Database Schema
The backend should have a `users` table with:
- `nim` (string, unique)
- `hashed_password` (string, nullable)
- `is_admin` (boolean)
- `confirm_token` (string, for activation)

### API Endpoints Required

#### POST /api/auth/login
**Purpose**: Authenticate user login
**Input**: `{ nim, password }`
**Output**: Success message + session cookie
**Errors**: 404 (not found), 401 (invalid credentials), 500 (server error)

#### POST /api/auth/confirm  
**Purpose**: Activate account and set password
**Input**: `{ nim, password }`
**Output**: Success message
**Errors**: 404 (not found), 401 (invalid token), 400 (validation), 500 (server error)

### Response Format
All API responses should follow this format:
```json
{
  "message": "Success message",
  "error": "Error message (if applicable)"
}
```

## Testing Scenarios

### Login Testing
- ✅ Valid NIM + correct password
- ❌ Valid NIM + incorrect password
- ❌ Invalid NIM
- ❌ Unactivated account
- ❌ Network errors

### Activation Testing
- ✅ Valid NIM + valid password
- ❌ Invalid NIM
- ❌ Password too short
- ❌ Password mismatch
- ❌ Already activated account
- ❌ Network errors
# Authentication Guide - Beat Store

## Overview

The backend uses JWT (JSON Web Tokens) for authentication. We have two separate login endpoints:
- **Admin login** - for dashboard/admin access (staff users only)
- **User login** - for regular users (anyone can use this)

Both return access and refresh tokens. Keep them secure on the frontend.

---

## Endpoints

### Register a New User
**POST** `/api/auth/register/`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securepassword123"
}
```

Response:
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

---

### Admin Login (Staff Only)
**POST** `/api/auth/login/`

Only works if the user has `is_staff = True` in the database. Use this for admin dashboard access.

```json
{
  "email": "admin@example.com",
  "password": "adminpassword123"
}
```

Success Response (200):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Error Response (403 - if not staff):
```json
{
  "detail": "Only staff users can access the admin dashboard."
}
```

---

### User Login (Open to Everyone)
**POST** `/api/auth/user-login/`

Any user can login here - staff or regular users. Use this for regular user/customer login.

```json
{
  "email": "customer@example.com",
  "password": "userpassword123"
}
```

Success Response (200):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## Token Usage

### Making Protected Requests
After login, include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Example:
```
GET /api/auth/profile/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Token Lifetimes
- **Access Token**: Valid for 1 day
- **Refresh Token**: Valid for 7 days

---

## Refreshing Tokens

When your access token expires (after 1 day), use the refresh token to get a new one:

**POST** `/api/auth/token/refresh/`

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Response (200):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

If refresh token is invalid/expired (401):
```json
{
  "detail": "Token is invalid or expired"
}
```

---

## Logout

**POST** `/api/auth/logout/`

Requires authentication (include access token in header).

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Response (200):
```json
{
  "message": "Logged out successfully"
}
```

---

## Get User Profile

**GET** `/api/auth/profile/`

Requires authentication (include access token in header).

Response (200):
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "created_at": "2026-06-27T10:30:00Z"
}
```

---

## Frontend Implementation Tips

### Token Storage
- **Access Token**: Store in memory or a very short-lived cookie (more secure)
- **Refresh Token**: Store in an httpOnly cookie if possible (most secure), or sessionStorage at minimum

### Auto-Refresh Flow
1. Make a request with the access token
2. If you get a 401, use the refresh endpoint to get a new access token
3. Retry the original request
4. If refresh fails, redirect user to login

### Security Notes
- Never store tokens in localStorage if you can avoid it - it's vulnerable to XSS attacks
- Never send tokens in URLs
- Always use HTTPS in production
- Clear tokens on logout

---

## Example Flow (Pseudo-code)

```
// Admin login
POST /api/auth/login/
  → Get access + refresh tokens
  → Store tokens securely
  → Redirect to admin dashboard

// Making API calls
GET /api/beats/
  Headers: Authorization: Bearer {access_token}
  → Success: Process response
  → 401 Error: Token expired

// Refresh token
POST /api/auth/token/refresh/
  Body: { "refresh": refresh_token }
  → Get new access token
  → Retry original request

// Logout
POST /api/auth/logout/
  Headers: Authorization: Bearer {access_token}
  Body: { "refresh": refresh_token }
  → Clear all stored tokens
  → Redirect to login
```

---

## Common Issues

**"Only staff users can access the admin dashboard."**
- User tried to login via `/api/auth/login/` but isn't a staff user
- Solution: Use `/api/auth/user-login/` for regular users, or ask admin to set `is_staff = True` for admin users

**"Token is invalid or expired"**
- Refresh token expired (> 7 days old)
- Solution: User must login again

**401 Unauthorized on protected endpoint**
- Access token is missing or expired
- Solution: Refresh the token or redirect to login

---

## Setting Up Admin Users in Database

To create an admin user, use Django shell or admin panel:

```python
from django.contrib.auth import get_user_model
User = get_user_model()

User.objects.create_user(
    username='admin',
    email='admin@example.com',
    password='securepassword',
    is_staff=True
)
```

Or via Django admin at `/admin/` after creating a superuser.

---

## Questions?

Let me know if you need clarification on anything. The two-endpoint setup lets regular users and admins use different login flows while keeping everything secure.

# 🔐 RBAC Configuration Tool – Full Stack Assignment

A production-ready **Role-Based Access Control (RBAC)** configuration tool built using **Next.js, Prisma, PostgreSQL, and JWT authentication**.

This project allows administrators to securely manage **users, roles, permissions**, and their relationships through a clean UI.

---

## 🚀 Live Demo

🔗 **Live URL:**  
https://rbac-config-tool-seven.vercel.app

---

## 🧠 What is RBAC? (Explain Like I’m 10)

RBAC means:
- People get **roles** (like Admin, Editor)
- Roles have **permissions** (like create, read, delete)
- Users can only do what their role allows

👉 This keeps systems **secure and organized**.

---

## 🎯 Why This Project Is Important

In real-world applications:
- Not every user should access everything
- RBAC prevents security issues
- Used in **admin panels, SaaS apps, enterprise software**

This project shows:
- Authentication knowledge
- Database design skills
- Secure backend logic
- Clean frontend architecture

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **TypeScript**
- **Shadcn UI + Tailwind CSS**

### Backend
- **Next.js API Routes**
- **JWT Authentication**
- **bcryptjs (password hashing)**

### Database
- **PostgreSQL**
- **Prisma ORM**

### Deployment
- **Vercel**
- **Prisma Generate during build**

---

## 🔐 Authentication Flow

1. User signs up with email & password
2. Password is hashed using bcrypt
3. User logs in
4. JWT access token is issued
5. Token is stored securely in **HTTP-only cookies**
6. Protected routes validate JWT before access

---

## 📂 Database Schema Overview

### Tables:
- `users`
- `roles`
- `permissions`
- `user_roles` (many-to-many)
- `role_permissions` (many-to-many)

Designed exactly as required in the assignment.

---

## ⚙️ Core Features Implemented

### ✅ User Authentication
- Signup
- Login
- Logout
- JWT-based session handling

### ✅ Permission Management
- Create permissions
- View permissions
- Assign permissions to roles

### ✅ Role Management
- Create roles
- View roles
- Assign permissions to roles

### ✅ Role ↔ Permission Mapping
- Visual role permission assignment
- Persisted in database
- Secure API endpoints

---

## 🧪 Test Credentials

Use the following to test the app:
Email: test@example.com
Password: 123456

Email: a@example.com
Password:223344


---

## 🧑‍💻 How to Run Locally

```bash
git clone <repo-url>
cd rbac-config-tool
npm install
npx prisma generate
npm run dev


Open:  http://localhost:3000

For Viewing Database: Use Prisma Studio for this run npx prisma studio in terminal , it will open at http://localhost:5555 in browser.

Author:
Aditya Lokhande
Full Stack Developer Intern Candidate.
 



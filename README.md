# 🗂️ Task Manager – Full Stack App

A modern full-stack Task Management system with authentication, role-based task handling, status tracking, and email notifications.

Built using **Next.js (Frontend)**, **Flask (Backend)**, **Supabase (Auth + DB)**, and **PostgreSQL**.

---

## 🚀 Live Demo

- 🌐 Frontend: https://task-manager-chi-gold-91.vercel.app/dashboard
- ⚙️ Backend API: https://task-manager-rm82.onrender.com

---

## ✨ Features

### 👤 Authentication
- Google OAuth login via Supabase
- Secure session handling
- Persistent login state

### 📋 Task Management
- Create tasks
- Assign tasks to users
- Track task status:
  - Pending
  - In Progress
  - Completed
- Filter tasks by:
  - Created by me
  - Assigned to me

### 📬 Email Notifications
- Email sent on task creation
- Email sent on task completion
- Integrated SMTP (Gmail)

### 📊 Dashboard
- Dynamic stats cards
- Task categorization
- Clean UI with responsive layout

### ⚡ UX Improvements
- No page reloads (state-driven updates)
- Loading states on actions
- Disabled buttons during API calls

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase JS Client

### Backend
- Flask
- Flask-CORS
- Flask-Mail
- SQLAlchemy

### Database
- Supabase PostgreSQL

### Auth
- Supabase Authentication (Google OAuth)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🏗️ System Architecture

```text
                   ┌─────────────────────┐
                   │   Next.js Frontend  │
                   │   (Vercel Deploy)   │
                   └─────────┬───────────┘
                             │
                 REST API Calls (Axios/Fetch)
                             │
                             ▼
                   ┌─────────────────────┐
                   │   Flask Backend     │
                   │   (Render Deploy)    │
                   └─────────┬───────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ Supabase Auth  │  │ PostgreSQL DB  │  │ Gmail SMTP     │
│ (Google OAuth) │  │ (Tasks/Users)  │  │ Email Service  │
└────────────────┘  └────────────────┘  └────────────────┘
```

📸 Screenshots

Replace these paths after uploading images to your repo or GitHub assets.

🔐 Login Page

📊 Dashboard

📝 Create Task Modal

📌 Task Board

## ⚙️ Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```
###Backend (.env)
```
DATABASE_URL=your_supabase_postgres_url
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

## 🛠️ Installation & Setup
1️⃣ Clone Repository
```
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
2️⃣ Backend Setup (Flask)
```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```
3️⃣ Frontend Setup (Next.js)
```
cd frontend
npm install
npm run dev
```

## 🚀 Deployment
Frontend (Vercel)
- Connect GitHub repo
- Set environment variables
- Build command: npm run build
  
Backend (Render)
- Add environment variables
- Start command:
```
gunicorn run:app
```

## 🔐 Auth Flow
1. User logs in with Google via Supabase
2. Supabase returns session + JWT
3. Frontend sends user info to backend /users/sync
4. Backend stores user in database
5. Tasks are linked using:
- created_by
- assigned_to
  
## 👨‍💻 Author

Sumit Kumar
Full Stack Developer
GitHub: https://github.com/arcane-2004

📄 License

This project is open source and available under the MIT License.

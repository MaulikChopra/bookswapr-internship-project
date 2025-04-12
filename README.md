# 📚 BookSwapr — Internship Project Submission

Welcome to **BookSwapr** — a peer-to-peer book exchange platform built for the internship assignment.  
This project is a full-stack web app using **Next.js** and **Express.js**, with clean UI/UX, full authentication flow, and bonus features implemented 🚀

---

## 🔗 Live Links

| Section        | URL                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 🌐 Frontend    | [https://bookswapr-internship-project.vercel.app](https://bookswapr-internship-project.vercel.app)                           |
| 🔧 Backend API | [https://bookswapr-internship-project.onrender.com/api/books](https://bookswapr-internship-project.onrender.com/api/books)   |
| 💻 GitHub Repo | [https://github.com/MaulikChopra/bookswapr-internship-project](https://github.com/MaulikChopra/bookswapr-internship-project) |

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/MaulikChopra/bookswapr-internship-project.git
cd bookswapr-internship-project
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Start Backend Locally

```bash
node server.js
```

> Make sure the backend binds to `process.env.PORT` if you're deploying it (especially for Render)!

### 5. Start Frontend Locally

```bash
cd ..
npm run dev
```

---

## ✅ What’s Working

- 📦 Full-featured **React + Next.js frontend**
- 🌐 **Express.js + Node.js backend** inside `/backend` folder
- 📄 JSON/FlatFile-based data storage (no external DBs used)
- 🔐 Full user authentication flow (sign in, register, persist session)
- 🧠 User context setup with `UserStack`, `UserContext` and `AuthProvider`
- 🕶️ Responsive UI with **light/dark mode support**
- 🛰️ Frontend deployed on **Vercel**, backend deployed on **Render**
- 🔁 API routes dynamically configured using `next.config.js`
- 📁 Folder structure:
  ```
  bookswapr-internship-project/
  ├── backend/         # Express.js backend
  └── (root)           # Next.js frontend
  ```

---

## 💎 Bonus Features (Everything’s done ✅)

| Feature            | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| 🗑️ Delete Listings | Delete existing book listings (allowed for owner only)                |
| 🔍 Filter Listings | Filter by genre & location                                            |
| 🖼️ Book Covers     | Add book cover using an image link                                    |
| ✅ Mark as Rented  | Toggle availability status with live updates (allowed for owner only) |
| 🚀 Deployment      | Deployed both frontend and backend on Vercel & Render                 |
| 🌓 Dark Mode       | Built-in light/dark mode toggle for better UX                         |

---

## 🤖 AI Tools Used

Yes, I used AI extensively to **boost productivity** and finish early. Here's a breakdown of what I used and how:

| Tool                                 | Purpose                                               |
| ------------------------------------ | ----------------------------------------------------- |
| 🧠 **Firebase Studio**               | Generated ~80% of code via smart prompts              |
| ✍️ **ChatGPT (Prompt Engineering)**  | Helped me craft prompts for Firebase Studio           |
| 🪄 **ChatGPT & Claude**              | For bug fixing, enhancements, and component additions |
| 🧪 **Cursor (IDE) & Github Copilot** | Local dev and debugging (used due to free credits)    |

> ⚡ Could’ve used Bolt or Windsor, but Firebase Studio + Cursor + ChatGPT gave the best free workflow for now.

---

## 🤔 Reflections

- I followed the assignment instructions **to the letter** – React, Next.js, Node.js, Express.js ✅
- Even though I could’ve used the full Next.js backend stack, I chose **Express.js** because the assignment required it
- Folder structure is clean with `backend` inside the main project folder
- Everything works, deployment is smooth, bonus features are done, and the app is responsive and user-friendly.

---

## 🚀 Final Thoughts

I’ve put in everything that was asked (and more), kept the stack clean, used AI tools smartly, and made sure the app is **production-ready**, responsive, and **fully functional**.

> Thanks for the opportunity! Hope you enjoy using BookSwapr as much as I enjoyed building it 🙌

---

Made with 💻, ☕, and a lot of ChatGPT by **Maulik Chopra**

## 🌐 Connect with Me

- 🔗 [My Portfolio](https://maulikchopra.github.io)
- 💻 [My GitHub](https://github.com/maulikchopra)
- 💼 [My LinkedIn](https://www.linkedin.com/in/maulikchopra)
- 📄 [My Resume](https://drive.google.com/file/d/1sJkFA9ZiZBIZnML9Sh3jGGj0oG5hs4-v/view)

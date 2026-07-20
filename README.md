# Premium Full-Stack Developer Portfolio

A modern, highly performant, and premium developer portfolio website built using the **MERN Stack** (MongoDB, Express, React, Node) with **Next.js** on the frontend. The project features elegant glassmorphism styling, interactive micro-animations, dynamic content components, and a fully functional secure contact form subsystem.

---

## 🚀 Tech Stack

### Frontend (Client)
* **Framework**: Next.js 15+ (App Router, React 19)
* **Styling**: Vanilla CSS with modern HSL variables
* **Animations**: Framer Motion
* **Interactions**: Canvas Confetti, Lucide Icons, TsParticles
* **Deployment**: Vercel

### Backend (Server)
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas (via Mongoose ODM)
* **Mail Client**: Nodemailer (via Gmail SMTP)
* **Security & Spam Protection**: Express Rate Limit & Input Sanitization
* **Deployment**: Render

---

## ✨ Features

1. **Interactive UI/UX**: Custom motion cursor, interactive particles canvas background, and smooth scrolling.
2. **Dynamic Project Showcase**: Details of full-stack applications with functional source code links.
3. **Interactive Resume Preview**: Clean online CV mockups with a dedicated PDF compilation system.
4. **MERN-backed Contact System**:
   * **Client Validation**: Complete regex checks for email structures and field lengths.
   * **Security**: Enforces server-side sanitization to neutralize script injection (XSS) and database rate-limiting to prevent automated spamming.
   * **Database logging**: Automatically stores messages inside MongoDB Atlas.
   * **Instant Alerts**: Sends a formatted HTML summary of the message to the owner.
   * **Auto-Reply**: Automatically replies to visitors with a professional confirmation receipt.
   * **Floating Toasts**: Slides success and error notifications using Framer Motion.
5. **Cross-Browser Hydration Suppression**: Suppresses Edge-specific autofill warnings (`fdprocessedid`) and browser translation attribute conflicts.

---

## 📂 Project Directory Structure

```text
├── portfolio/          # Next.js frontend application
│   ├── public/         # Static assets (images, icons, resume.pdf)
│   ├── scripts/        # Resume PDF generator compiler
│   ├── src/
│   │   ├── app/        # Page routes, layout, global styles
│   │   └── components/ # React components (Hero, Navbar, Contact, etc.)
│   └── package.json
│
└── server/             # Express.js backend application
    ├── config/         # Database and Nodemailer SMTP configurations
    ├── controllers/    # Route controllers (contactController.js)
    ├── models/         # Database schemas (Contact.js)
    ├── routes/         # Express routing (contactRoutes.js)
    ├── server.js       # App entrypoint
    └── package.json
```

---

## 🛠️ Quick Start & Installation

### Prerequisite
* Make sure you have **Node.js (v18+)** and **npm** installed on your local machine.

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd <repository-folder>
```

### Step 2: Configure Environment Variables

#### Backend (`server/`)
Create a `.env` file inside the `server/` directory and configure the variables (see [server/.env.example](server/.env.example) for reference):
```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-google-app-password
RECEIVER_EMAIL=your-email@gmail.com
```
> **Gmail App Password Setup**: Standard passwords are blocked by Google. You must go to Google Account Security, enable **2-Step Verification**, search for **App passwords**, generate a new token, and set it as `EMAIL_PASS`.

#### Frontend (`portfolio/`)
Create a `.env` file inside the `portfolio/` directory (see [portfolio/.env.example](portfolio/.env.example) for reference):
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run the Backend Server
```bash
cd server
npm install
npm run dev
```
The server will start up on `http://localhost:5000`. If `MONGO_URI` is not defined locally, the database writes will bypass gracefully so email features can still be verified.

### Step 4: Run the Frontend Client
Open a new terminal tab:
```bash
cd portfolio
npm install
npm run dev
```
The client will start up on `http://localhost:3000`. Any fetch calls to `/api/contact` will be proxied automatically to port 5000 via local Next.js rewrites.

---

## 📄 Re-compiling the Resume PDF
Your resume download actions target `public/resume.pdf`. To update the PDF details dynamically:
1. Update your information inside [ResumePreview.tsx](portfolio/src/components/ResumePreview.tsx) or modify the compiler layout script inside [generate-resume.js](portfolio/scripts/generate-resume.js).
2. Run the compiler script from the `portfolio/` folder:
   ```bash
   node scripts/generate-resume.js
   ```
This updates `public/resume.pdf` with the compiled single-page layout.

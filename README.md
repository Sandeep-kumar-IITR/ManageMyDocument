📄 ManageMyDocument – Frontend README (React + Netlify)

A clean, friendly guide for both everyday users and developers.

✨ Overview

ManageMyDocument (Frontend) is a React web app that lets users register/login, upload and manage documents (PDF/DOCX/TXT), and ask AI-powered questions about their documents. It talks to a Django REST API and uses Gemini + Hugging Face for Q&A enhancements.

Live (Netlify): e.g., https://ManageMyDocument-frontend.netlify.app

Backend API (Render): e.g., https://ManageMyDocument-backend.onrender.com

Replace the URLs above with your actual deployments.

👤 For Non‑Technical Users

Open the website (Netlify URL above).

Register with your email and password.

Log in – the app keeps you signed in with a secure token.

Go to Documents → Upload to add a PDF/DOCX/TXT.

Click a document → Ask a Question to query its contents using AI.

You can rename or delete documents anytime from the list.

We never show other users’ files. Only you can see the documents you uploaded.

🧑‍💻 For Developers

Tech Stack

React 18 (Vite or CRA)

Auth: JWT (stored securely)

API: Django REST backend

AI: Gemini (Google AI) + Hugging Face Inference API

Prerequisites

Node.js ≥ 18 and npm/yarn/pnpm installed

Backend API running locally or on Render

API keys for Gemini & Hugging Face (if you proxy via backend, you may not need them on the client)

Quick Start (Local)

# 1) Clone
git clone https://github.com/yourname/ManageMyDocument-frontend-git.git
cd ManageMyDocument-frontend-git

# 2) Install deps
npm install

# 3) Configure environment
cp .env.example .env
# edit .env to set API base URL etc.

# 4) Run
npm run dev    # or npm start (CRA)

Environment Variables

Create .env (do not commit it):

# API base (local or Render)
VITE_API_BASE_URL=https://ManageMyDocument-backend.onrender.com

# If the frontend calls AI directly (usually NOT recommended)
VITE_GEMINI_API_KEY=your_gemini_key
VITE_HF_API_KEY=your_huggingface_key

Recommended: send AI requests through the backend so keys are never exposed in the browser.

Project Scripts

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}

API Usage From Frontend (Example)

// src/services/api.ts
const BASE = import.meta.env.VITE_API_BASE_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // { access: 'jwt', refresh?: 'jwt' }
}

Auth: Where JWT Lives

Store access token in memory or in localStorage with rotation.

Attach Authorization: Bearer <token> header to protected calls.

Optionally implement refresh token flow if provided by backend.

Build & Deploy (Netlify)

Push your repo to GitHub.

On Netlify → New site from Git → pick your repo.

Build command: npm run build | Publish directory: dist (Vite) or build (CRA).

Environment variables: add VITE_* from above in Site settings → Build & deploy → Environment.

Redirects (optional): create _redirects to handle SPA routes:

/*    /index.html   200

Troubleshooting

CORS errors: Ensure backend allows your Netlify domain in CORS settings.

401 Unauthorized: Check that JWT header is attached; token not expired.

Uploads fail: Verify backend /documents/ POST accepts multipart/form-data.

AI not responding: Confirm backend keys configured and quotas available.

UI/UX Notes

Accessible forms, clear error states, and toasts for success/failure.

Large files: show progress; limit size on client (e.g., 10–25MB) to avoid timeouts.

License & Contributing

Open an issue/PR on GitHub.

Include commit messages like feat:, fix:, docs:.

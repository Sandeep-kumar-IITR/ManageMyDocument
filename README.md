# ManageMyDocument Frontend

This is the **frontend** repository for the Document Management Portal with AI Integration.  
Built using **React.js**, deployed on **Netlify**.

---

## 🚀 Features
- User registration & login (JWT authentication)
- Dashboard for document management (upload, view, update, delete)
- Ask AI questions about uploaded documents (Gemini + Hugging Face APIs)
- Secure access: only authenticated users can manage their documents

---

## 🛠️ Tech Stack
- **React.js**
- **Axios** (API communication)
- **JWT Authentication**
- **Netlify** (Hosting)

---

## 📦 Installation (Local Development)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ManageMyDocument-frontend.git
   cd ManageMyDocument-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

---

## ⚙️ Environment Setup
Create a `.env` file in the project root with the following:

```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_HF_API_KEY=your_huggingface_api_key
```

---

## 🌐 Deployment
- Hosted on **Netlify**  
  URL: `https://ManageMyDocument-frontend.netlify.app`

---

## 📚 References
- [React Docs](https://react.dev/)
- [Netlify Deployment Guide](https://docs.netlify.com/)

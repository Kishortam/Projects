# 🧠 Think Board

**Think Board** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to create, read, update, and delete notes efficiently. It also includes a rate-limiting feature to enhance performance and security by preventing abuse.

---

## ✨ Features

- ✅ Create, Read, Update, Delete (CRUD) notes
- 🚫 Rate limiting for request control and protection
- 🎨 Stylish UI with Tailwind CSS and daisyUI
- ⚙️ Full-stack architecture using MERN stack
- ☁️ Deployed on [Render.com](https://thinkboard-xb6x.onrender.com)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- daisyUI

### 🔹 Backend
- Express.js
- MongoDB
- Rate Limiting Middleware (e.g., `express-rate-limit`)

---

## 🚀 Deployment

This project is deployed on **Render.com**, offering a seamless full-stack hosting solution.

---

## 📁 Folder Structure

```bash
think-board/
│
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/                 # Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
│
└── README.md









🧪 Getting Started Locally
1. Clone the repository
git clone https://github.com/Kishortam/think-board.git

Reop Link:
https://github.com/Kishortam/Projects/tree/main/Full-Stack%20Projects/MERN-ThinkBoard

cd MERN-ThinkBoard

2. Install dependencies
For the backend:
cd backnd
npm install
For the frontend:

cd ../frontend
npm install

3. Environment Setup
Create a .env file in the server folder with the following:
env
PORT=5001
MONGO_URI=your_mongodb_connection_string

4. Run the app
In one terminal, start the backend:
cd backend
npm run dev

In another terminal, start the frontend:
cd frontend
npm start

Visit http://localhost:5173 to use the app.


🙌 Acknowledgments
React
Tailwind CSS
daisyUI
Express
MongoDB
Render

Made with ❤️ by Kishor Tambe

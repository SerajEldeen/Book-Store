# MERN CRUD Application

A simple full-stack web application that performs **CRUD operations** using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- Create, Read, Update, and Delete operations
- Built with modular and clean code
- Frontend (React + Vite) and Backend (Express.js + Node.js)
- Connected to MongoDB using Mongoose

---

## 🔧 Usage

### 1. Create a MongoDB Database

- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or your local MongoDB server.
- Copy your MongoDB connection string (URI).

---

### 2. Set Up Environment Variables & Install Dependencies

```bash
# Backend environment variables (.env file)
echo "PORT=3000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url" > backend/.env

# Frontend environment variables (.env file)
echo "VITE_BASE_URL=your_backend_api_url" > frontend/.env

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

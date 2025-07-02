# 🎥 YouTube Clone - MERN Stack Capstone Project

A full-stack video streaming platform inspired by YouTube. This project lets users register, log in, watch videos, create channels, interact via comments, and experience a fully responsive UI. Built using the **MERN stack**: MongoDB, Express, React, and Node.js.

---

## Demo Video Link : https://drive.google.com/file/d/14J3QnRYDBL193_Kqls6BcLoRiaH4myZV/view?usp=sharing
## GitHub Frontend Repo : https://github.com/akbansal765/capstone_frontend_code
## GitHub Backend Repo : https://github.com/akbansal765/capstone_backend_code


## 🚀 Features

### 🏠 Home Page
- YouTube-style header and sidebar
- Video cards with thumbnails, titles, channel names, and view counts
- Category filter buttons
- Search functionality to filter videos by title

### 🔐 User Authentication
- Sign up and login with username, email, and password
- Have used Regular expressions(Regex) for validating email and password
- JWT-based secure authentication
- Separate Registration form for sign-in simulation
- After login, welcome message will be shown

### 🔎 Search & Filters
- Real-time search bar in the header
- Filter videos based on category tags

### 📺 Video Player Page
- Embedded video player
- Display title, description, views, likes/dislikes
- Comment system (add, edit, delete)
- Only logged in user can add, edit, and delete commments

### 📡 Channel Page
- Authenticated users can create channels
- Upload, edit, delete videos tied to a channel
- View videos uploaded by a specific channel

### 📱 Responsive Design and Performace enhancement
- Optimized layout for desktops, tablets, mobiles, and landscape orientations
- Implemented Lazy Loading to improve efficiency of the code

---

## ⚙️ Technologies Used

### Frontend
- React
- React Router

### Backend
- Node.js
- Express.js

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt for password hashing

### Database
- MongoDB Atlas (cloud-hosted MongoDB)

### Tools
- Git for version control
- Google Forms (simulated auth UI)

---

## 🗃️ Project Structure (Simplified)

```
capstone-project/
│
├── frontend/src/            # React frontend
│   ├── Components/
│   ├── assets/icons
│   ├── CSS/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/            # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
│             
└── README.md
```

---

## 📦 Getting Started

### 🧑‍💻 Prerequisites

- Node.js (v16 or later)
- MongoDB Atlas account
- Git

### 🔧 Setup Instructions

#### 1. Install Frontend
```bash
cd frontend
npm install
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4. Start Backend Server
```bash
npm start
```

#### 5. Start Frontend React App
```bash
npm run dev
```
---



## 📝 Future Improvements

- Video upload with file handling (currently metadata only)
- Nested comments and replies
- Google OAuth integration
- Realtime notifications
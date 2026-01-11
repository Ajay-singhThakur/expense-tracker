# 💰 Modern Expense Tracker (Full Stack)

A professional, high-performance personal finance application built with the **MERN** stack. This app features a clean, premium UI with real-time transaction tracking, dynamic data visualization, and an optimized user experience.



## ✨ Key Features

* **Real-Time Dashboard**: Automatic instant calculation of Total Balance, Income, and Expenses.
* **Dual-Theme UI**: Premium **Dark Mode** and **Light Mode** support with a centralized toggle in the Sidebar.
* **Performance Optimized**: Integrated **Skeleton Loaders** to ensure a smooth UI experience during data fetching and server spin-up.
* **Detailed Transaction Logs**: Comprehensive tracking with Category Icons and **exact Timestamps** (Date + Hour/Minute).
* **Visual Analytics**: Financial distribution (Pie Charts) and weekly trends (Bar Charts) for better insights.
* **Optimistic UI Updates**: Instant UI feedback on adding/deleting transactions for a seamless, "zero-lag" feel.
* **Secure Authentication**: JWT-based login/signup with Bcrypt password encryption.

## 🚀 Tech Stack

**Frontend:**
* **React.js** (Functional Components, Context API)
* **Tailwind CSS** (Custom Dark Mode & Responsive Design)
* **Lucide React** (Modern Iconography)
* **Axios** (Secure API Communication)

**Backend:**
* **Node.js & Express** (RESTful API Architecture)
* **MongoDB & Mongoose** (NoSQL Database Management)
* **JWT & Bcrypt.js** (Security, Authentication & Encryption)

---

## 👨‍💻 Author

**Created by Ajay**
* **Role**: Full Stack Developer
* **Specialization**: UI/UX Optimization, React Architecture, and State Management.

---

## 🛠️ Installation & Setup

### 1. Backend Setup
Navigate to the `/backend` directory:
```bash
npm install

## Create a .env file and add your credentials:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Start the server:
npm start

## Navigate to the /frontend directory:
npm install
npm run dev
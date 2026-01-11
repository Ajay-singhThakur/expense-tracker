# 💰 Modern Expense Tracker (Full Stack)

A professional, full-stack personal finance application built with the **MERN** stack (MongoDB, Express, React, Node.js). This app features a clean, high-performance UI with real-time transaction tracking and dynamic data visualization.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Expense+Tracker+Dashboard+Preview)

## ✨ Key Features

* **Real-Time Dashboard**: Automatic calculation of Total Balance, Income, and Expenses.
* **Smart Sorting**: Transactions are automatically ordered by date and time (Newest on top).
* **Dual-Theme UI**: Seamlessly switch between **Light Mode** and a premium **Dark Mode** (Tailwind CSS).
* **Detailed Records**: Track category, icons, and exact timestamps (Hour/Minute) for every transaction.
* **Visual Analytics**: Financial distribution and weekly trends visualized via interactive charts.
* **Currency Support**: Fully formatted for **Indian Rupees (₹)**.
* **Secure Auth**: User registration and login powered by JWT (JSON Web Tokens).

## 🚀 Tech Stack

**Frontend:**
* React.js
* Tailwind CSS (Dark Mode enabled)
* Lucide React (Icons)
* Axios (API calls)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (NoSQL Database)
* JWT & Bcrypt.js (Security)

## 🛠️ Installation & Setup

## Backend Setup:  Navigate to /backend
npm install
 ## Create a .env file and add:PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
## Run to start server:
 npm start

 ## Frontend Setup: Navigate to /frontend
Run npm install
npm run dev
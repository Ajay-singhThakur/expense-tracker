const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
    // Replace the URL below with your EXACT Vercel URL
    origin: 'https://expense-tracker-mdyx1pdbe-ajay-pal-singh-thakurs-projects.vercel.app', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // This is mandatory for withCredentials: true to work
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/income', require('./routes/incomeRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
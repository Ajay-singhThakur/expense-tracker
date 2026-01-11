import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Providers
import { UserProvider } from './context/UserContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; // <--- YE ADD KIYA

// Pages
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Dashboard/Home.jsx';
import Income from './pages/Income/Income.jsx';
import Expense from './pages/Expense/Expense.jsx';

function App() {
    return (
        <UserProvider>
            {/* ThemeProvider ko yahan wrap karna zaroori hai */}
            <ThemeProvider> 
                <Router>
                    <Toaster position="top-center" />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expense />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </UserProvider>
    );
}

export default App;
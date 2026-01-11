import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wallet, Receipt, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useUser();
    
    // Theme State
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    // Effect to apply theme on load
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    if (!context) return null;
    const { user, logout } = context;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menu = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={22}/> },
        { name: 'Income', path: '/income', icon: <Wallet size={22}/> },
        { name: 'Expense', path: '/expense', icon: <Receipt size={22}/> },
    ];

    return (
        <aside className="w-72 bg-white dark:bg-slate-900 h-screen border-r dark:border-slate-800 p-8 flex flex-col fixed left-0 top-0 shadow-sm z-40 transition-colors duration-300">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">
                    ET
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Expense Tracker</span>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-2">
                {menu.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-medium ${
                            location.pathname === item.path 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        {item.icon} {item.name}
                    </Link>
                ))}
            </nav>

            {/* Bottom Section: Theme Toggle & User Profile */}
            <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">

                <div className="flex items-center gap-4 mb-6 px-2 pt-4">
                    <img 
                        src={user?.profileImageUrl ? `http://localhost:5000/${user.profileImageUrl}` : `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}`} 
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-50 dark:ring-slate-800" 
                        alt="avatar" 
                    />
                    <div className="overflow-hidden">
                        <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{user?.fullName || "Guest"}</p>
                        <p className="text-xs text-slate-400">Premium User</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-4 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all font-semibold"
                >
                    <LogOut size={20}/> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
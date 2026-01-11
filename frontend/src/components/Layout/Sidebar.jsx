import React, { useState } from 'react';
import { LayoutDashboard, Wallet, Receipt, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useUser();
    const { darkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!context) return null;
    const { user, logout } = context;

    // Render Backend URL for Profile Images
    const BACKEND_URL = "https://expense-tracker-i0m9.onrender.com";

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
        <>
            {/* MOBILE HEADER */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">ET</div>
                    <span className="font-bold dark:text-white">Expense Tracker</span>
                </div>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg dark:text-white transition-colors"
                >
                    {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* OVERLAY */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-all"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`w-72 bg-white dark:bg-slate-900 h-screen border-r border-slate-100 dark:border-slate-800 p-8 flex flex-col fixed left-0 top-0 shadow-sm z-40 transition-transform duration-300 md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100 dark:shadow-none">ET</div>
                    <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Expense Tracker</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menu.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-medium ${
                                location.pathname === item.path 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div className="px-2 mb-4">
                        <button 
                            onClick={toggleTheme}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-bold transition-all border ${
                                darkMode 
                                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            <span className="text-sm">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6 px-2">
                        <img 
                            src={user?.profileImageUrl ? `${BACKEND_URL}/${user.profileImageUrl}` : `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random`} 
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-50 dark:ring-slate-800" 
                            alt="avatar" 
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=random` }}
                        />
                        <div className="overflow-hidden">
                            <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{user?.fullName || "Guest"}</p>
                            <p className="text-xs text-slate-400">Premium User</p>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all font-semibold">
                        <LogOut size={20}/> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
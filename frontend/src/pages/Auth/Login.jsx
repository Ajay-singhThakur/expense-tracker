import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import API from '../../utils/api.js';
import { useUser } from '../../context/UserContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            
            // This 'login' function comes from our Context to save user data globally
            login(data.user, data.token);
            
            toast.success(`Welcome back, ${data.user.fullName}!`);
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-100">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">Login</h2>
                    <p className="text-slate-400 font-medium mt-1">Access your expense dashboard</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
                        <LogIn size={20}/> Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 font-medium">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Create one for free</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
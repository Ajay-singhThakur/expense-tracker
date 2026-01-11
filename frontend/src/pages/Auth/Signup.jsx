import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Image as ImageIcon, Mail, Lock, User } from 'lucide-react';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (image) data.append('profileImage', image);

        try {
            await API.post('/auth/register', data);
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
                <h2 className="text-3xl font-black text-center mb-2 text-slate-800">Join Us</h2>
                <p className="text-slate-500 text-center mb-8">Create your financial tracking account</p>
                
                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="flex justify-center mb-6">
                        <label className="relative cursor-pointer group">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-200 flex items-center justify-center overflow-hidden bg-slate-50 group-hover:border-blue-400 transition-all">
                                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-300" size={30} />}
                            </div>
                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                    </div>

                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all">
                        <UserPlus size={20}/> Create Account
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500 font-medium">
                    Already a member? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
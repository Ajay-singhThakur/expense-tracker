import axios from 'axios';

const API = axios.create({
    baseURL: 'https://expense-tracker-i0m9.onrender.com', 
    withCredentials: true
});

// This is the interceptor you were looking for:
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token"); 
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
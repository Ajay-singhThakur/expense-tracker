import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Make sure this matches your backend port
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
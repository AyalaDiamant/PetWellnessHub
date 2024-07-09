import axios from 'axios';
// import { isAdmin } from './token.api';

const API_URL = 'http://localhost:8001';
let isRegister = true;

const login = async (name: any, password: any) => {
    try {
        if (name === 'Admin' && password === 'Admin1Admin' && isRegister) {
            const adminData = {
                name: 'Admin',
                email: 'Admin@gmail.com',
                isAdmin: true
            };
            const res = await register(adminData.name, adminData.email, password);
            if (res == 'User already exists.') {
                isRegister = false;
                login(name,password)
            }
        }
        const response = await axios.post(`${API_URL}/Login`, { name, password });
        if (response) {
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('user-name', name);
            localStorage.setItem('userId', response.data.userId);
        }
        alert('התחברת בהצלחה! ')
        return response.data;
    } catch (error: any) {
        let errorMessage = error.response.data;
        alert(errorMessage);
        console.error('Error during login:', error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-name');
    localStorage.removeItem('userId');
};

const register = async (name: any, email: any, password: any) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        localStorage.setItem('auth-token', response.data.token);
        localStorage.setItem('user-name', name);
        localStorage.setItem('userId', response.data.userId);
        console.log({ name, email, password });
        console.log('response.data', response.data);
        let isAdmin = false;
        if (name === 'Admin' && password === 'Admin1Admin') {
            isAdmin = true;
        }
        if (!isAdmin) {
            alert('נרשמת בהצלחה! ');
        }
        return response.data;
    } catch (error: any) {
        let errorMessage = error.response.data;
        let isAdmin = false;
        if (name === 'Admin' && password === 'Admin1Admin') {
            isAdmin = true;
        }
        if (!isAdmin) {
            alert(errorMessage);
            console.error('Error during registration:', error);
            throw error;
        }
    }
};

export { login, logout, register };

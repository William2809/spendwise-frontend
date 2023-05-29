import axios from "axios";
import { RegisterForm } from "../../pages/auth/Register";
import { LoginForm } from '../../pages/auth/Login';
const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/users/';

//Register User
const register = async (userData: RegisterForm) => {
    try {
        const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
    } catch (err:any) {
        throw new Error(err.response?.data?.message || 'Cannot be registered.');
    }
}

//login user
const login = async (userData: LoginForm) => {
    try {
        const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
    } catch (err:any) {
        throw new Error(err.response?.data?.message || 'Cannot be logged in.');
    }
}

//google signin/signup
const googleSignIn = async (userData: any) => {

    const response = await axios.post(API_URL + 'googlesignin', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// Logout user
const logout = () => localStorage.removeItem('user');

const authService ={
    register,
    login,
    logout,
    googleSignIn
}
export default authService;
import axios from "axios";
import { RegisterForm } from "../../pages/auth/Register";
import { LoginForm } from "../../pages/auth/Login";
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/users/";

//Register User
const register = async (userData: RegisterForm) => {
	try {
		const response = await axios.post(API_URL + "register", userData);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be registered.");
	}
};

//login user
const login = async (userData: LoginForm) => {
	try {
		const response = await axios.post(API_URL, userData);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be logged in.");
	}
};

//google signin/signup
const googleSignIn = async (userData: any) => {
	const response = await axios.post(API_URL + "googlesignin", userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

// Check if user has password
const checkPassword = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "post",
			url: API_URL + "checkpassword",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: { email: user.email },
		};
		const response = await axios(config);
		return response.data.status;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be added.");
	}
};

// set new password or change password
const setPassword = async (
	newPassword: string | null,
	currentPassword: string | null
) => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "post",
			url: API_URL + "setpassword",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				email: user.email,
				newPassword: newPassword,
				currentPassword: currentPassword,
			},
		};
		const response = await axios(config);
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Invalid Password");
	}
};

const authService = {
	register,
	login,
	logout,
	googleSignIn,
	checkPassword,
	setPassword,
};
export default authService;

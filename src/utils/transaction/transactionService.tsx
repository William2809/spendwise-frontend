import axios from "axios";
import { transactionForm } from "../../components/TransactionModal";
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/transactions/";

// const userItem = localStorage.getItem("user");
// const user = userItem ? JSON.parse(userItem) : [];

//Add Transaction
const addTransaction = async (transactionForm: transactionForm) => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "post",
			url: API_URL + "add",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: transactionForm,
		};
		const response = await axios(config);
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be added.");
	}
};

//Get transaction
const getTransaction = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL + "get",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios(config);
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be added.");
	}
};

//get classify text
const classifyTransaction = async (text: string) => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "post",
			url: API_URL + "classify",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: { text: text },
		};
		const response = await axios(config);
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be added.");
	}
};

const transactionService = {
	addTransaction,
	getTransaction,
	classifyTransaction,
};
export default transactionService;

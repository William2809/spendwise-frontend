import axios from "axios";
const API_URL_TRANSACTIONS =
	import.meta.env.VITE_BACKEND_URL + "/api/transactions/";
const API_URL_USERS = import.meta.env.VITE_BACKEND_URL + "/api/users/";

const analyzeAndRecommend = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL_TRANSACTIONS + "recommend",
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

const predict = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL_TRANSACTIONS + "predict",
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

const savePrediction = async (weeklyPrediction: number[]) => {
	try {
		console.log(weeklyPrediction);
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "post",
			url: API_URL_USERS + "saveprediction",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: { weeklyPrediction: weeklyPrediction },
		};
		const response = await axios(config);
		return response.data;
	} catch (err: any) {
		throw new Error(err.response?.data?.message || "Cannot be saved.");
	}
};

const getWeeklyPrediction = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL_USERS + "getweeklyprediction",
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

const updateDailyTransaction = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL_TRANSACTIONS + "updatedailytransactions",
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

const deleteAllDailyTransaction = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "delete",
			url: API_URL_TRANSACTIONS + "deletedailytransactions",
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

const insightsService = {
	analyzeAndRecommend,
	predict,
	savePrediction,
	getWeeklyPrediction,
	updateDailyTransaction,
	deleteAllDailyTransaction,
};
export default insightsService;

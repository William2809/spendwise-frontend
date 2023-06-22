import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/transactions/";
const API_URL1 = import.meta.env.VITE_BACKEND_URL + "/api/users/";

const analyzeAndRecommend = async () => {
	try {
		const userItem = localStorage.getItem("user");
		const user = userItem ? JSON.parse(userItem) : [];
		const token = user.token;
		const config = {
			method: "get",
			url: API_URL + "recommend",
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
			url: API_URL + "predict",
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
			url: API_URL1 + "saveprediction",
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
			url: API_URL1 + "getweeklyprediction",
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
};
export default insightsService;

import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/transactions/";

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

const insightsService = {
	analyzeAndRecommend,
};
export default insightsService;

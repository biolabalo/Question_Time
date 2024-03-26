import axios from "axios"

export const questionTime = "questionTime";

export const axiosInstance = axios.create({
	baseURL: 'https://qt.organogram.app/', // Replace with your actual base URL
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(questionTime); // Or your chosen storage method
		if (token) {
			config.headers.Token = token
		}
		return config;
	},
	(error) => {
		console.error('Error adding token:', error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		// if (error.response.status === 401) {
		// 	if (error.response.data.message === 'Cannot authenticate session') {
		// 		logout();
		// 	}
		// }

		return Promise.reject(error);
	},
);

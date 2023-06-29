import axios from 'axios';

export const baseAPI = axios.create({
	baseURL: process.env.REACT_APP_BASE_API,
	withCredentials: true,
});

export const get = async (url, config = {}) => {
	const result = await baseAPI.get(url, config);

	return result.data;
};

export const post = async (url, data, config = {}) => {
	const result = await baseAPI.post(url, data, config);

	return result.data;
};

export const patch = async (url, data, config = {}) => {
	const result = await baseAPI.patch(url, data, config);

	return result.data;
};
export const deleteHTTP = async (url, config = {}) => {
	const result = await baseAPI.delete(url, config);

	return result.data;
};

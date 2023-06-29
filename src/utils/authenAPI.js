import axios from 'axios';

export const authenInstance = axios.create({
	baseURL: process.env.REACT_APP_AUTHEN_API,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export const get = async (url, config = {}) => {
	const res = await authenInstance.get(url, config);

	return res.data;
};

export const post = async (url, data, config = {}) => {
	const res = await authenInstance.post(url, data, config);

	return res.data;
};

export const patch = async (url, data, config = {}) => {
	const res = await authenInstance.patch(url, data, config)

	return res.data;
};

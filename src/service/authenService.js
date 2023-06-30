import * as authenAPI from '@/utils/authenAPI';

export const register = async (data, config = {}) => {
	try {
		const result = await authenAPI.post('/api/auth/register', data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate register API');
	}
};

export const login = async (data, config = {}) => {
	try {
		const result = await authenAPI.post('/api/auth/login', data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate login API');
	}
};
export const logOut = async (data, config = {}) => {
	try {
		const result = await authenAPI.post('/api/auth/logout', data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate logout API');
	}
};
export const changePassword = async (data, config = {}) => {
	try {
		const result = await authenAPI.patch('/api/auth/change-password', data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate change password API');
	}
};


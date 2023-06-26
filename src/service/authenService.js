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

// Here: change password, refresh token, log-out, ...!
// Using:
//Ex: Muốn đăng ký chẳng hạn thì import authenServer và gọi async func register(data, config if need)
//=> Dùng promise  để nhận result

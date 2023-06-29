import * as api from '@/utils/api';

export const search = async (config) => {
	try {
		const result = await api.get('/api/book/search', config);
		return result.data;
	} catch (er) {
		throw new Error('Can not operate search book API');
	}
};

import * as api from '@/utils/api';

export const getAll = async (config) => {
	try {
		const result = await api.get('/api/genre', config);
		return result.data;
	} catch (er) {
		throw new Error('Can not operate get GENRE API');
	}
};

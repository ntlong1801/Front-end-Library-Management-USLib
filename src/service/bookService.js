import * as api from '@/utils/api';

export const getAllBook = async () => {
	try {
		const result = await api.get('/api/book');
		return result.data;
	} catch (er) {
		throw new Error('Can not operate get book API');
	}
};

export const createBook = async (data, config) => {
	try {
		const result = await api.post('/api/book', data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate post book API');
	}
};

export const editBook = async (id, data, config) => {
	try {
		const result = await api.patch(`/api/book/${id}`, data, config);
		return result;
	} catch (er) {
		throw new Error('Can not operate edit book API');
	}
};

export const deleteBook = async (id, config) => {
	try {
		const result = await api.deleteHTTP(`/api/book/${id}`, config);
		return result.data;
	} catch (er) {
		throw new Error('Can not operate delete book API');
	}
};

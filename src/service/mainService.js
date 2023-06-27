import * as api from '@/utils/api';

export const getAllBook = async (config = {}) => {
    try {
        const result = await api.get('/api/book', config);
        return result.data;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const getAllReader = async (config = {}) => {
    try {
        const result = await api.get('/api/reader', config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const addReader = async (data, config = {}) => {
    try {
        const result = await api.post('/api/reader', data, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const deleteReader = async (id, config = {}) => {
    try {
        const result = await api.deleteHTTP(`/api/reader/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const getOneReader = async (id, config = {}) => {
    try {
        const result = await api.get(`/api/reader/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const updateOneReader = async (id, data, config = {}) => {
    try {
        const result = await api.patch(`/api/reader/${id}`, data, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};
import * as api from '@/utils/api';

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

export const search = async (data, config = {}) => {
    try {
        const result = await api.get(`/api/reader/search?fullName=${data}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const viewRequest = async (config = {}) => {
    try {
        const result = await api.get(`/api/interaction/request`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const deleteRequest = async (student_id, config = {}) => {
    try {
        const result = await api.deleteHTTP(`/api/interaction/${student_id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};
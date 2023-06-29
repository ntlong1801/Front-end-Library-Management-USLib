import * as api from '@/utils/api';

export const getAllBook = async (config = {}) => {
    try {
        const result = await api.get('/api/book', config);
        return result.data;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const viewReserveBook = async (id, config = {}) => {
    try {
        const result = await api.get(`/api/interaction/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const viewBorrowedBook = async (id, config = {}) => {
    try {
        const result = await api.get(`/api/interaction/book/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const renewalBorrowBook = async (id, config = {}) => {
    try {
        const result = await api.patch(`/api/interaction/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const reserveBook = async (data, config = {}) => {
    try {
        const result = await api.post(`/api/interaction`, data, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};
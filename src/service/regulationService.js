import * as api from '@/utils/api';

export const getAllRegulation = async (config = {}) => {
    try {
        const result = await api.get('/api/regulation', config);
        return result.data;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const addRegulation = async (data, config = {}) => {
    try {
        const result = await api.post('/api/regulation', data, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

export const deleteRegulation = async (id, config = {}) => {
    try {
        const result = await api.deleteHTTP(`/api/regulation/${id}`, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

// export const getOneReader = async (id, config = {}) => {
//     try {
//         const result = await api.get(`/api/reader/${id}`, config);
//         return result;
//     } catch (er) {
//         throw new Error('Can not operate login API');
//     }
// };

export const updateOneRegulation = async (id, data, config = {}) => {
    try {
        const result = await api.patch(`/api/regulation/${id}`, data, config);
        return result;
    } catch (er) {
        throw new Error('Can not operate login API');
    }
};

import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

// user APIs
export const getUser = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
};

// summary APIs
export const getSummaries = async () => {
    const response = await axios.get(`${API_URL}/summaries`);
    return response.data;
};

export const getSummary = async (id) => {
    const response = await axios.get(`${API_URL}/summaries/${id}`);
    return response.data;
};

export const addSummary = async (summary) => {
    const response = await axios.post(`${API_URL}/summaries`, summary);
    return response.data;
};

export const updateSummary = async (id, summary) => {
    const response = await axios.put(`${API_URL}/summaries/${id}`, summary);
    return response.data;
};

export const deleteSummary = async (id) => {
    const response = await axios.delete(`${API_URL}/summaries/${id}`);
    return response.data;
};
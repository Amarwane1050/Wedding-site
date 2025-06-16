import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const token = () => localStorage.getItem('token');

export const getTasksByWeddingId = (weddingId) => {
  return axios.get(`${API_URL}/tasks/${weddingId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};

export const addTask = (weddingId, name, done = false) => {
  return axios.post(`${API_URL}/tasks`, { weddingId, name, done }, {
    headers: { Authorization: `Bearer ${token()}` },
  });
};

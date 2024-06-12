// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8001/api', // Adjust based on your backend URL
});

export const fetchMemes = () => api.get('/memes');
export const createMeme = (meme) => api.post('/memes', meme);
export const updateMeme = (id, meme) => api.put(`/memes/${id}`, meme);
export const deleteMeme = (id) => api.delete(`/memes/${id}`);

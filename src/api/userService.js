import axios from 'axios';

const API = axios.create({ baseURL: 'https://example.com/api' });

export const saveUser = (data) => API.post('/users', data);

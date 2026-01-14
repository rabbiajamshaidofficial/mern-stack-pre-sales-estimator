import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/estimate' });

export const estimateService = {
  getAll: () => API.get('/all'),
  generate: (data) => API.post('/', data),
  delete: (id) => API.delete(`/${id}`)
};
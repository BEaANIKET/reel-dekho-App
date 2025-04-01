import axios from 'axios';
import {API_BASE_URL} from '@env';

console.log(API_BASE_URL);

const api = axios.create({
  baseURL: 'https://admin.reeldekho.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

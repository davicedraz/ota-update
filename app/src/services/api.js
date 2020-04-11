import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.101.47.10:8001'
});

export default api;

const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:4444/api',
});

export default api;

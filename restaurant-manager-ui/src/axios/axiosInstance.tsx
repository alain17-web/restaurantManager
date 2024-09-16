import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL
// Creating a custom instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});

// Adding an interceptor to the Axios instance to modify requests before they are sent
axiosInstance.interceptors.request.use(config => {
    // Extracting the token from browser cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    // If a token is found, set the Authorization header for the request
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Return the modified request configuration
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;

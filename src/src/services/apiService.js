import axios from 'axios';
import getApiBaseUrl from '../utils/envUtils';

const apiBaseUrl = getApiBaseUrl();

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
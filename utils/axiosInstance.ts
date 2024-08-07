// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your Django API base URL
});

export default axiosInstance;

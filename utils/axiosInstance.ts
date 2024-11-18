// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/', // Replace with your Django API base URL
});

export default axiosInstance;

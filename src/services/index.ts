import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '/api',
  timeout: 2000,
});

axiosClient.interceptors.response.use((res) => {
  return res.data;
});

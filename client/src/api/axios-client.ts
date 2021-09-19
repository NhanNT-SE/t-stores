import { BASE_URL } from 'config';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error: AxiosError) {
    const errorStatus = error.response?.status;
    if (errorStatus === 401) {
      const originalRequest = error.config;
      const errorMsg = error.response?.data.errors[0].message;
      if (errorMsg === 'Jwt expired' && !originalRequest._retry) {
        /* REFRESH TOKEN */
        originalRequest._retry = true;
        await axiosClient.post('/auth/refresh-token');
        return axiosClient(originalRequest);
      } else {
        /* NEED TO RE LOGIN */
        console.log('require re-login');
      }
      console.log('axios error', originalRequest._retry);
    }

    return Promise.reject(error);
  }
);
export { axiosClient };

import { LoginInput, ResponseModel } from 'models';
import { axiosClient } from './axios-client';

const authApi = {
  login(data: LoginInput): Promise<ResponseModel.ResponseAny> {
    const url = '/auth/sign-in';
    return axiosClient.post(url, data);
  },
  checkAuth(): Promise<any> {
    const url = '/auth/check-auth';
    return axiosClient.get(url);
  },
  refreshToken(): Promise<any> {
    const url = '/auth/refresh-token';
    return axiosClient.post(url);
  },
};
export { authApi };

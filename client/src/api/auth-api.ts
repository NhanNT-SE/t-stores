import { LoginInput, ResponseModel, User } from "models";
import { axiosClient } from "./axios-client";

const authApi = {
    login(data: LoginInput): Promise<ResponseModel.ResponseAny>{
        const url = '/auth/sign-in';
        return axiosClient.post(url, data);
    }

}
export default authApi;
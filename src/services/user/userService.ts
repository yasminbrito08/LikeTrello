import { httpService } from "../httpService";
import type { RegisterUser, UserResponse } from "./user.model";

export class _UserService extends httpService {
    async fetchUser(): Promise<UserResponse>{
        return this.axios({
            method: "GET",
            url:"", //auth/me
        }).then((res) => res.data)
    }
    async registerUser(data: RegisterUser): Promise<UserResponse>{
        return this.axios.request({
            method: "POST",
            url: "users",
            withCredentials: true,
            data
        }).then((res) => res.data)
    }
}

export const UserService = new _UserService()
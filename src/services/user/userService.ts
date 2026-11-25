import { httpService } from "../httpService";
import type { RegisterUser, UpdatePassword, UpdatePasswordResponse, UpdateUser, UpdateUserResponse, UserResponse } from "./user.model";

export class _UserService extends httpService {
    async fetchUser(): Promise<UserResponse>{
        return this.axios({
            method: "GET",
            url:"auth",
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
    async updateUserInfor(data: UpdateUser, userId: string): Promise<UpdateUserResponse>{
        return this.axios({
            method: "PATCH",
            url: `users/${userId}`,
            withCredentials: true,
            data
        }).then((res) => res.data)
    }
    async updatePassword(data: UpdatePassword, userId: string): Promise<UpdatePasswordResponse>{
        return this.axios({
            method: "PATCH",
            url: `users/${userId}/password`,
            withCredentials: true,
            data
        }).then((res) => res.data)
    }
}

export const UserService = new _UserService()
import axios, { type AxiosInstance } from "axios";
import type { LoginResponse } from "../user/user.model";

export class _AuthService {
    axios: AxiosInstance;

    constructor(){
        this.axios = axios.create({
            baseURL: "http://localhost:8080/api/v1/"
        })
    }
    async login(email: string, password: string): Promise<LoginResponse>{
        return this.axios.request({
            method: "POST",
            url: "auth/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email,
                password,
            },
            withCredentials: true
        }).then((res) => res.data)
    }
    async logout(){
        return this.axios.request({
            method: "DELETE",
            url: "", //implementar no back,
            withCredentials: true,
        }).then((res) => res.data)
    }
}

export const AuthService = new _AuthService()
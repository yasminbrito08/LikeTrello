import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export class _AuthService {
    axios: AxiosInstance;

    constructor(){
        this.axios = axios.create({
            baseURL: "http://localhost:8080/api/v1/"
        })
    }
    async login(login: string, password: string): Promise<AxiosResponse>{
        return this.axios.request({
            method: "POST",
            url: "", //precisa implementar no back
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                login,
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
import axios, { type AxiosInstance } from "axios";

export class httpService {
    protected axios: AxiosInstance;

    constructor(baseUrl: string = "http://localhost:8080/api/v1/" as string){
        this.axios = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        })
    }
}
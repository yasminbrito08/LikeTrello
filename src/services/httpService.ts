import axios, { type AxiosInstance } from "axios";

export class httpService {
    protected axios: AxiosInstance;

    constructor(baseUrl: string = "http://localhost:8080/api/v1/" as string){
        this.axios = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        });
        this.axios.interceptors.request.use((config) => {
            const raw = localStorage.getItem("@app:usuario");
            if(!raw) return config;

            try{
                const session = JSON.parse(raw) as { accessToken?: string; tokenType?: string};
                if(session.accessToken){
                    config.headers.Authorization = `${session.tokenType ?? "Bearer"} ${session.accessToken}`;
                }
                
            } catch{

            }
            return config;
        });
    }
}
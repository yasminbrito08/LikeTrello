export interface UserCredentials {
    login: string;
    password: string;
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    userId: string;
}
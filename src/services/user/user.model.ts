export interface UserCredentials {
    email: string;
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

export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
}

export interface UpdateUser {
    username: string;
    email: string;
}

export interface UpdateUserResponse {
    id: string;
}

export interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePasswordResponse {
    id: string;
}
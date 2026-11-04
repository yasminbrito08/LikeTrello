import { create } from "zustand";
import type { RegisterUser, UserCredentials, UserResponse } from "../services/user/user.model";
import { AuthService } from "../services/auth/authService";
import { UserService } from "../services/user/userService";

interface UserStore {
    user: UserResponse | undefined;
    userIsLoading: boolean;
    isFetchDataUser: boolean;
    login: (credentials: UserCredentials) => Promise<unknown>;
    fetchUser: () => Promise<UserResponse | undefined>;
    logout: () => Promise<void>;
    registerUser: (data: RegisterUser) => Promise<UserResponse>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: undefined,
    userIsLoading: false,
    isFetchDataUser: false,

    async login(credentials) {
        return await AuthService.login(credentials.login, credentials.password); // login não está implementado
    },

    async fetchUser() {
        try {
            set({ userIsLoading: true, isFetchDataUser: true });
            const response = await UserService.fetchUser();

            if (response) {
                set({ user: response });
            }

            return get().user;
        } finally {
            set({ userIsLoading: false, isFetchDataUser: false });
        }
    },

    async logout() {
        await AuthService.logout();
        set({ user: undefined });
    },

    async registerUser(data) {
        return await UserService.registerUser(data);
    },
}));

export const selectIsLogged = (state: UserStore) =>
    !state.isFetchDataUser && !!state.user;

//exemplo de uso:
// import { useUserStore, selectIsLogged } from "../contexts/AuthContext";

// // estado / ações
// const user = useUserStore((s) => s.user);
// const login = useUserStore((s) => s.login);
// const fetchUser = useUserStore((s) => s.fetchUser);

// // isLogged derivado
// const isLogged = useUserStore(selectIsLogged);
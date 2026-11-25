import { create } from "zustand";
import type { LoginResponse, RegisterUser, UserCredentials, UserResponse } from "../services/user/user.model";
import { AuthService } from "../services/auth/authService";
import { UserService } from "../services/user/userService";

const USUARIO_STORAGE_KEY = "@app:usuario";

function readStoredUser(): LoginResponse | undefined {
    const storedUser = localStorage.getItem(USUARIO_STORAGE_KEY);
    if (!storedUser) return undefined;

    try {
        const user = JSON.parse(storedUser) as LoginResponse;
        if (!user?.id) return undefined;
        return user;
    } catch {
        return undefined;
    }
}

interface UserStore {
    user: LoginResponse | undefined;
    userIsLoading: boolean;
    isFetchDataUser: boolean;
    login: (credentials: UserCredentials) => Promise<unknown>;
    fetchUser: () => Promise<UserResponse | undefined>;
    logout: () => Promise<void>;
    registerUser: (data: RegisterUser) => Promise<UserResponse>;
    updateUser: (data: { username: string; email: string }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: readStoredUser(),
    userIsLoading: false,
    isFetchDataUser: false,

    async login(credentials) {
        const session = await AuthService.login(credentials.email, credentials.password);
        set({ user: session });
        localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(session));
        return session;
    },

    async fetchUser() {
        try {
            set({ userIsLoading: true, isFetchDataUser: true });
            return await UserService.fetchUser();
        } finally {
            set({ userIsLoading: false, isFetchDataUser: false });
        }
    },
    updateUser(data) {
        const currentUser = useUserStore.getState().user;
        if (!currentUser) return;
      
        const updatedUser = {
          ...currentUser,
          username: data.username,
          email: data.email,
        };
      
        set({ user: updatedUser });
        localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(updatedUser));
      },

    async logout() {
        await AuthService.logout();
        localStorage.removeItem(USUARIO_STORAGE_KEY);
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
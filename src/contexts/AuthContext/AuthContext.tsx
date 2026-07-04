import { createContext } from "react";

export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (credentials: Credentials) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

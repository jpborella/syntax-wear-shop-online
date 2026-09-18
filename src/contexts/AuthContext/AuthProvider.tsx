import { useEffect, useState } from "react";
import {
    AuthContext,
    type Credentials,
    type RegisterInput,
    type User,
} from "./AuthContext";
import { API_BASE_URL } from "../../services/api";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                    method: "GET",
                    credentials: "include", // faz com que os cookies sejam enviados junto com a requisição
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar perfil do usuário");
                }

                const data = await response.json();
                setUser(data.user);
                setIsAuthenticated(true);

                console.log(data.user);

            } catch (error) {
                console.error("Erro ao buscar perfil do usuário:", error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    async function signIn(credentials: Credentials): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include", // faz com que os cookies sejam enviados junto com a requisição
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao fazer login");
        }

        setUser(data.user);
        setIsAuthenticated(true);
    }

    async function signUp(data: RegisterInput): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Erro ao registrar usuário");
        }

        setUser(result.authUser || result.user);
        setIsAuthenticated(true);
    }

    async function signOut(): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/auth/signout`, {
                method: "POST",
                credentials: "include", // faz com que os cookies sejam enviados junto com a requisição
            })

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    async function signInWithGoogle(credential: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
            method: "POST",
            credentials: "include", // faz com que os cookies sejam enviados junto com a requisição
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential }),
        });

        const result = await response.json();

        if (!response.ok || !result.user) {
            throw new Error(result.message || "Erro ao fazer login com Google");
        }

        setUser(result.user);
        setIsAuthenticated(true);
    }

    async function updatePhone(phone: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Não foi possível atualizar o telefone.");
        }

        setUser((currentUser) => currentUser ? { ...currentUser, phone: data.phone ?? phone } : currentUser);
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        updatePhone,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

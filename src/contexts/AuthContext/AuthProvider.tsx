import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, type Credentials, type User } from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const signIn = useCallback(async (credentials: Credentials): Promise<void> => {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorPayload = await response.json().catch(() => null);
            const message = errorPayload?.message || "Erro ao autenticar";
            throw new Error(message);
        }

        const responseBody = await response.json();
        setUser(responseBody.user ?? null);
    }, []);

    const signOut = useCallback(async (): Promise<void> => {
        await fetch(`${apiUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    }, []);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch(`${apiUrl}/auth/me`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const responseBody = await response.json();
                setUser(responseBody.user ?? null);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            signIn,
            signOut,
        }),
        [user, isLoading, signIn, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

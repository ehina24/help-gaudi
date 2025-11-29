import { useEffect, useState } from "react";
import { api, type User } from "../api";
import { AuthContext } from "../contexts/AuthContext";


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await api.me();
                setUser(me);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const refresh = async () => {
        try {
            const me = await api.me();
            setUser(me);
        } catch {
            setUser(null);
        }
    };

    const logout = async () => {
        await api.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
// Reactで提供されているフックを読み込む（画面の状態や副作用を扱うため）
import { useEffect, useState } from "react";
// サーバーとの通信をまとめたapiと、User型（ユーザー情報の形）を読み込む
import { api, type User } from "../api";
// 認証に関する状態をアプリ全体で共有するためのコンテキストを読み込む
import { AuthContext } from "../contexts/AuthContext";


// AuthProvider:
// - 認証まわりの状態（user, loading）と操作（refresh, logout）をまとめる
// - 画面初回表示時にサーバーへ「今ログインしているか」を確認し、結果をContextで配信する
// - ラップした子コンポーネントは、useAuth()を通して上記の状態と関数を利用できる
export function AuthProvider({ children }: { children: React.ReactNode }) {
    // ログイン中のユーザー情報を持つ。最初はnull（未ログイン）
    const [user, setUser] = useState<User | null>(null);
    // 認証確認中かどうか。最初はtrueで「確認中」から始める
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // コンポーネントの初回表示時に、ログイン状態をサーバーへ確認する
        (async () => {
            try {
                // 自分自身のユーザー情報を取得できればログインしている
                const me = await api.me();
                setUser(me);
            } catch {
                // エラーになった場合は未ログインとして扱う
                setUser(null);
            } finally {
                // 確認が終わったのでローディング状態を解除
                setLoading(false);
            }
        })();
    }, []);

    const refresh = async () => {
        try {
            // 再度サーバーに問い合わせて最新のユーザー情報を反映
            const me = await api.me();
            setUser(me);
        } catch {
            // 失敗したら未ログインとして扱う
            setUser(null);
        }
    };

    const logout = async () => {
        // サーバー側のセッションを終了し、ローカルの状態もリセット
        await api.logout();
        setUser(null);
    };

    return (
        // Context経由で子コンポーネントに認証関連の情報や操作を提供する
        <AuthContext.Provider value={{ user, loading, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

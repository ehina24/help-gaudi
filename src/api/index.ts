import { baseURL } from "../utils/baseURL";

export type User = {
    id: number;
    email: string;
    display_name: string;
    created_at?: string;
    updated_at?: string;
};

export type EventType = {
    id?: number,
    user_id?: number,
    tag_id?: number,
    value: number,
    note: string,
    created_at: string,
    updated_at: string,
    delete_flag: 0 | 1,
    version: number,
}

export function create(): EventType {
    return {
        value: 1,
        note: '',
        created_at: '',
        updated_at: '',
        delete_flag: 0,
        version: 0,
    }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${baseURL}${path}`, {
        // Cookieを扱うAPI（login/me/logout）は include 推奨
        credentials: "include",
        headers: { "content-type": "application/json", ...(init.headers || {}) },
        ...init,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(`${res.status}:${res.statusText}`);
    }
    return data as T;
}

export const api = {
    /**
     * ログインする時に使用する関数
     * ※ 非同期(async)があるところでしかダメ
     * @param email - メールアドレス(文字型)
     * @param password - 自分だけがわかるパスワード(文字型)
     * @param display_name - このアプリで使う名前
     * @returns 成功:{ User } | 失敗:{"error": string}
     * @example
     * await api.signup(mail, pass, name)
     */
    signup: (email: string, password: string, display_name: string) =>
    request<User>("/users", {
        method: "POST",
        body: JSON.stringify({ email, password, display_name }),
    }),

    /**
     * ログインする時に使用する関数
     * ※ 非同期(async)があるところでしかダメ
     * @param email - メールアドレス(文字型)
     * @param password - 自分だけがわかるパスワード(文字型)
     * @returns 成功:{ User } | 失敗:{"error": string}
     * @example
     * await api.login(email, password)
     */
    login: (email: string, password: string) =>
    request<User>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    }),

    /**
     * ログインしたら Cookie にトークンが保存されるのでそれを使用して自分のデータを取ってくる
     * ※ 非同期(async)があるところでしかダメ
     * @returns 成功:{ User } | 失敗:{"error": string}
     * @example
     * await api.me()
     */
    me: () => 
    request<User>("/me", {
        credentials: "include",
    }),

    /**
     * カウント「1」をDBに追加する関数
     * ※ 非同期(async)があるところでしかダメ
     * @param user_id - ユーザーID (数値型)
     * @returns 成功:{ EventType } | 失敗:{"error": string}
     * @example
     * await api.addCount(user?.id)
     */
    addCount: (user_id: number) => {
        const newEvent = create()

        newEvent.user_id = user_id
        newEvent.tag_id = 0
        newEvent.value = 1
        newEvent.note = ''

        return request<EventType>("/events", {
            method: "POST",
            body: JSON.stringify(newEvent)
        })
    },

    /**
     * ログインしているユーザーが今までにカウントしたすべての回数を取得できる関数
     * ※ 非同期(async)があるところでしかダメ
     * @param user_id - ユーザーID (数値型)
     * @returns 成功:{'count': number} | 失敗:{"error": string}
     * @example
     * await api.allCount(user?.id)
     */
    allCount: (user_id: number) => {
        return request<{'count': number}>(`/events/allCount?user_id=${user_id}`, {
            method: "GET"
        })
    },

    /**
     * ログアウトする時に使用する関数
     * ※ 非同期(async)があるところでしかダメ
     * @returns 成功:{ ok: true } | 失敗:{"error": string}
     * @example
     * await api.logout()
     */
    logout: () => request<{ ok: true }>("/logout", { method: "POST" }),
}

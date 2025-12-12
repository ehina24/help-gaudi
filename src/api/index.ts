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
    signup: (email: string, password: string, display_name: string) =>
    request<User>("/users", {
        method: "POST",
        body: JSON.stringify({ email, password, display_name }),
    }),

    login: (email: string, password: string) =>
    request<User>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    }),

    me: () => 
    request<User>("/me", {
        credentials: "include",
    }),

    // 要素が必要になれば増やす
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

    logout: () => request<{ ok: true }>("/logout", { method: "POST" }),
}

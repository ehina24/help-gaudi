import { useState } from "react";
import { api, type User } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<null | User>(null);
    const { refresh } = useAuth();

    const navigate = useNavigate()

    const onLogin = async () => {
        setMsg("");
        setLoading(true);
        try {
            await api.login(email, password);
            const me = await api.me();
            setUser(me);
            await refresh(); // AuthProvider側のuserも更新する
            setMsg("ログイン成功！");
            navigate('/')
        } catch (e) {
            setMsg(`ログイン失敗：${e}`);
        } finally {
            setLoading(false);
        }
    };


    return(
        <>
            <div style={{display:"grid", gap:8, maxWidth:420}}>
                <h3>ログイン</h3>
                <input placeholder="メール" value={email} onChange={e=>setEmail(e.target.value)} />
                <input placeholder="パスワード" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button onClick={onLogin} disabled={loading}>{loading ? "処理中..." : "ログイン"}</button>
                {msg && <p>{msg}</p>}
                {user?.id}{user?.email}{user?.display_name}
            </div>
        </>
    )
}

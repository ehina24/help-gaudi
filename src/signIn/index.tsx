import { useState } from "react";
import { api, type User } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from './styles.module.css'
import CustomInput from "../components/CustomInput";


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<null | User>(null);
    const { refresh } = useAuth();
    const [conPass, setConPass] = useState<boolean>(false)
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
            <div className={styles.imageWrap}>

            </div>
            <div className={styles.mainContent}>
                <div className={styles.contentWrap}>
                    <CustomInput label="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} isPass={false} />
                    <CustomInput label="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} isPass={true} TorP={conPass} onClick={() => setConPass(conPass ? false : true)}/>
                    <button onClick={onLogin} disabled={loading}>{loading ? "処理中..." : "ログイン"}</button>
                    {msg && <p>{msg}</p>}
                    {user?.id}{user?.email}{user?.display_name}
                </div>
            </div>
        </>
    )
}

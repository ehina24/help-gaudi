import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from './styles.module.css'
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import IconGroup from "../components/IconGroup";
import AuthImg from "../components/AuthImg";


export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { refresh } = useAuth();
    const [conPass, setConPass] = useState<boolean>(false)
    const navigate = useNavigate()

    const onLogin = async () => {
        setMsg("");
        setLoading(true);
        try {
            await api.login(email, password);
            const me = await api.me();
            if (me) {
                throw new Error
            }
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
            <AuthImg />
            <div className={styles.mainContent}>
                <div className={styles.contentWrap}>
                    <CustomInput label="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} isPass={false} />
                    <CustomInput label="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} isPass={true} TorP={conPass} onClick={() => setConPass(conPass ? false : true)}/>
                    <div>
                        <Button label={loading ? "処理中..." : "ログイン"} onClick={onLogin} disabled={loading}/>
                        {msg && <p className={styles.msg}>{msg}</p>}
                    </div>
                </div>
                <div className={styles.IconGroup}>
                    <IconGroup msg={msg} isLogin={true} />
                </div>
                <div className={styles.btnWrap}>
                    <Button label={"新規作成へ"} onClick={() => navigate('/signUp')}/>
                </div>
            </div>
        </>
    )
}

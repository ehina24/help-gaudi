import { useState } from "react"
import { api } from "../api"
import { useNavigate } from "react-router-dom"
import AuthImg from "../components/AuthImg"
import CustomInput from "../components/CustomInput"
import styles from './styles.module.css'
import Button from "../components/Button"
import IconGroup from "../components/IconGroup"

export default function SignUp() {
    const [mail, setMail] = useState('') 
    const [pass, setPass] = useState('') 
    const [secondPass, setSecondPass] = useState('') 
    const [name, setName] = useState('') 
    const [conPass, setConPass] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const validate = () => {
        if (!mail || !pass || !secondPass || !name) {
            return "全ての項目を入力してください"
        }
        // 超シンプルなメール検証（必要なら強化してOK）
        if (!/^\S+@\S+\.\S+$/.test(mail)) {
            return "メールアドレスの形式が不正です"
        }
        if (pass.length < 8) {
            return "パスワードは8文字以上にしてください"
        }
        if (pass !== secondPass) {
            return "パスワードが一致しません"
        }
        return null
    }

    const handleSignup = async () => {
        setError("")
        const v = validate()
        if (v) {
        setError(v)
        return
        }
        setLoading(true)
        try {
            const data = await api.signup(mail, pass, name)
            if (data) {
                throw new Error
            }
            // フォームを軽くリセット
            setPass('')
            setSecondPass('')
            navigate('/logIn')
        } catch (e) {
            setError(`登録に失敗しました:${e}`)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <AuthImg />
            <div className={styles.mainContent}>
                <div className={styles.contentWrap}>
                    <CustomInput label="メールアドレス" value={mail} onChange={(e) => setMail(e.target.value)} isPass={false} />
                    <CustomInput label="パスワード" value={pass} onChange={(e) => setPass(e.target.value)} isPass={true} TorP={conPass} onClick={() => setConPass(conPass ? false : true)}/>
                    <CustomInput label="2回目パスワード" value={secondPass} onChange={(e) => setSecondPass(e.target.value)} isPass={true} TorP={conPass} onClick={() => setConPass(conPass ? false : true)}/>
                    <CustomInput label="ユーザーネーム" value={name} onChange={(e) => setName(e.target.value)} isPass={false} />
                    <div className={styles.contentBtn}>
                        <Button label={loading ? "登録中..." : "新規登録"} onClick={handleSignup} disabled={loading}/>
                        {error && <p className={styles.msg}>{error}</p>}
                    </div>
                </div>
                <div className={styles.IconGroup}>
                    <IconGroup msg={error} isLogin={false} />
                </div>
                <div className={styles.btnWrap}>
                    <Button label={"ログインへ"} onClick={() => navigate('/login')}/>
                </div>
            </div>
        </>
    )
}
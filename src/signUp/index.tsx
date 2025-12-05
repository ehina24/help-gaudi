import { useState } from "react"
import { api, type User } from "../api"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [mail, setMail] = useState('') 
    const [pass, setPass] = useState('') 
    const [secondPass, setSecondPass] = useState('') 
    const [name, setName] = useState('') 

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    const [createdUser, setCreatedUser] = useState<null | User>(null)

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
        setCreatedUser(null)
        try {
            const data = await api.signup(mail, pass, name)
            setCreatedUser(data)
            // フォームを軽くリセット
            setPass('')
            setSecondPass('')
            navigate('/signIn')
        } catch (e) {
            setError(`登録に失敗しました:${e}`)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <div style={{display:"grid", gap: 12, maxWidth: 420}}>
                <div>
                    <label>メールアドレス</label><br/>
                    <input type="email" value={mail} onChange={(e) => {setMail(e.target.value)}} />
                </div>
                <div>
                    <label>パスワード</label><br/>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
                <div>
                    <label>2回目パスワード</label><br/>
                    <input type="password" value={secondPass} onChange={(e) => setSecondPass(e.target.value)} />
                </div>
                <div>
                    <label>ユーザーネーム</label><br/>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <button onClick={handleSignup} disabled={loading}>
                    {loading ? "登録中..." : "新規登録"}
                </button>

                {error && <p style={{color:"crimson"}}>{error}</p>}

                {createdUser && (
                <div style={{padding:12, border:"1px solid #ddd", borderRadius:8}}>
                    <p>登録に成功しました！</p>
                    <ul style={{margin:0, paddingLeft:18}}>
                        <li>ID: {createdUser.id}</li>
                        <li>Email: {createdUser.email}</li>
                        <li>Display Name: {createdUser.display_name}</li>
                        {createdUser.created_at && <li>Created At: {createdUser.created_at}</li>}
                    </ul>
                </div>
                )}
            </div>
        </>
    )
}
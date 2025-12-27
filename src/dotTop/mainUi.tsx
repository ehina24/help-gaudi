import { useEffect, useState } from "react";
import DotTop from "./dotTop";
import styles from "./ui.module.css";
import Popup from "../components/PopUp";
import { api, type EventType } from "../api";
import { useAuth } from "../hooks/useAuth";

export default function MainUi() {
    const [showInput, setShowInput] = useState(false);
    const [count, setCount] = useState<EventType | null>(null)
    const { user } = useAuth();

    const handleAddCount = async () => {
        setShowInput(!setShowInput)
        if (user) {
            const data = await api.addCount(user?.id)
            setCount(data)
        }
    }

    const handleLogout = async () => {
        await api.logout()
        window.location.reload();
    }
    
    useEffect(() => {
        if (count) {
            alert(`${count.value}回カウントされました`)
        }
    },[count])

    return (
        <div className={styles.wrapper}>
            <DotTop />

            <button
                className={styles.homeruButton}
                onClick={handleAddCount}
            >
                自分を褒める
            </button>
            <button 
                onClick={handleLogout}
            >ログアウト</button>

            {showInput && (
                <div className={styles.eventInputWrapper}>
                    <Popup />
                    {/* <TextBox text="カウントされました！昨日も褒められていましたね。積み重ねていきましょう！"/> */}
                </div>
            )}
        </div>
    );
}

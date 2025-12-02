import { useState } from "react";
import DotTop from "./dotTop";
import styles from "./ui.module.css";
import Popup from "../components/PopUp";
import { useAuth } from "../hooks/useAuth";

export default function MainUi() {
    const [showInput, setShowInput] = useState(false);
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };
    return (
        <div className={styles.wrapper}>
            <DotTop />

            <button
                className={styles.homeruButton}
                onClick={() => handleLogout()}
            >
                自分を褒める
            </button>

            {showInput && (
                <div className={styles.eventInputWrapper}>
                    <Popup />
                    {/* <TextBox text="カウントされました！昨日も褒められていましたね。積み重ねていきましょう！"/> */}
                </div>
            )}
        </div>
    );
}

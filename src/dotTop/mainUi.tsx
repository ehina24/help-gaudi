import { useState } from "react";
import DotTop from "./dotTop";
import styles from "./ui.module.css";
import Popup from "../components/PopUp";

export default function MainUi() {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className={styles.wrapper}>
            <DotTop />

            <button
                className={styles.homeruButton}
                onClick={() => setShowInput(!showInput)}
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

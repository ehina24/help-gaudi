    import { useState } from "react";
    import DotTop from "./dotTop";
    import TextBox from "../components/TextBox/TextBox";
    import styles from "./ui.module.css";

    export default function MainUi() {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className={styles.wrapper}>
        <DotTop />

        <button
            className={styles.homeruButton}
            onClick={() => setShowInput(true)}
        >
            自分を褒める
        </button>

        {showInput && (
            <div className={styles.eventInputWrapper}>
            <TextBox text="カウントされました！昨日も褒められていましたね。積み重ねていきましょう！"/>
            </div>
        )}
        </div>
    );
    }

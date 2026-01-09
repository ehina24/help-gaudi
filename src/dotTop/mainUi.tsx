    import { useState } from "react";
    import DotTop from "./dotTop";
    //import TextBox from "../components/TextBox/TextBox";
    import styles from "./ui.module.css";

    export default function MainUi() {
    //const [showInput, setShowInput] = useState(false);

    return (
        <div className={styles.wrapper}>
        <DotTop />
        </div>
    );
    }

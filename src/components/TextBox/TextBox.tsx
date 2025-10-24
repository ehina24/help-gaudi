import styles from './style.module.css'

type Props = {
    text: string
    onClick?: () => void
}

export default function TextBox(props: Props) {
    return (
        <>
            <div
                className={styles.textBox}
                onClick={props.onClick}
            >
                <p>{props.text}</p>
                <div className={styles.triangle}></div>
            </div>
        </>
    )
}

// 使い方
// import TextBox from './components/TextBox/TextBox'

// <TextBox text="今日やったことを入力してください！"/>

// 何か押した時に動作をさしたい時
// <TextBox text="今日やったことを入力してください！" onClick={() => consol.log('クリックされました')}/>
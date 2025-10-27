import styles from './style.module.css'

type Props = {
    choicesText: string[]
    onClick: (text: string) => void
}

export default function Choices(props: Props) {
    return (
        <>
            <div className={styles.choicesWrap}>
                {props.choicesText.map((text, index) => (
                    <div
                        key={index}
                        className={styles.choice}
                        onClick={() => props.onClick(text)}
                    >
                        <div className={styles.triangle}></div>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

// 使い方
//   <Choices
//     choicesText={['はい', 'もう一度']}
//     onClick={(text) => {
//       console.log("押されたのは:", text)
//     }}
//   />

//   <Choices
//     choicesText={['今までのメモ', '回数データ', 'もう大丈夫です']}
//     onClick={(text) => {
//       console.log("押されたのは:", text)
//     }}
//   />
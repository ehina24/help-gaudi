import styles from './style.module.css'

type Props = {
    label: string
    onClick: () => void
    disabled?: boolean
}

export default function Button(props: Props) {
    return(
        <>
            <button className={styles.btn} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
        </>
    )
}

// 使用例

// 最低限
// <Button label="ログイン" onClick={ () => { consol.log('テスト') } }/>

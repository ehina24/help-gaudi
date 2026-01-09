import styles from './style.module.css'

type Props = {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isPass: boolean
    TorP?: boolean
    onClick?: () => void
}

export default function CustomInput(props: Props) {
    return (
        <>
            {!props.isPass ?
                <div className={styles.inputWrap}>
                    <label className={styles.label}>{props.label}</label>
                    <input type='text' className={styles.input} value={props.value} onChange={props.onChange} />
                </div>
                :
                <div className={styles.inputWrap}>
                    <label className={styles.label}>{props.label}</label>
                    <input type={props.TorP ? 'text' : 'password'} className={styles.input} value={props.value} onChange={props.onChange} />
                    <img className={styles.eyeImg} src={`eye.svg`} alt="eye" onClick={props.onClick} />
                </div>
            }
        </>
    )
}
import styles from './style.module.css'

type EventInputProps = {
    value: string
    onChange: (newValue: string) => void
    className?:string
}

export default function EventInput({ value, onChange }: EventInputProps) {
    return (
        <div className={styles.inputWrap}>
            <textarea
                className={styles.textArea}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

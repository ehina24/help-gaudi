import styles from './style.module.css'

type EventInputProps = {
    value: string
    onChange: (newValue: string) => void
    className?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function EventInput({
    value,
    onChange,
    className,
    onKeyDown,
}: EventInputProps) {
    return (
        <div className={`${styles.inputWrap} ${className || ''}`}>
            <textarea
                className={styles.textArea}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

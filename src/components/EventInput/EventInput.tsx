import { useState } from 'react'
import styles from './style.module.css'

export default function EventInput() {
    const [state, setState] = useState<string>('')

    return (
        <>
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
        </>
    )
}
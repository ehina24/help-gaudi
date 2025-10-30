import styles from './style.module.css'
import TextBox from '../components/TextBox/TextBox'
import { useState } from 'react'
import EventInput from '../components/EventInput/EventInput'
import Choices from '../components/Choices/Choices'

function TOP() {
    const [step, setStep] = useState(0)
    const [inputText, setInputText] = useState('')

    const handleClick = () => setStep(1)

    const handleTextClick = () => {
        if (step === 1) setStep(2)
    }

    const handleConfirm = () => {
        if (inputText.trim() !== '') setStep(3)
    }

    const handleChoiceClick = (text: string) => {
        if (text === 'はい') {
            setStep(4)
        } else {
            setStep(2)
        }
    }

    const handleCompleteClick = () => {
        setStep(0)
        setInputText('')
    }

    return (
        <>
            <div className={styles.person}>
                <div className={styles.circle}></div>
                <div className={styles.triangle}></div>
            </div>

            <div className={styles.rectangle}>
                {step === 1 && (
                    <div className={styles.textBoxWrapper}>
                        <TextBox
                            text="今日やったことを入力してください！"
                            onClick={handleTextClick}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.inputSection}>
                        <EventInput
                            value={inputText}
                            onChange={setInputText}
                            className={styles.movableInput}
                        />
                        <button className={styles.nextBtn} onClick={handleConfirm}>
                            入力完了
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.confirmSection}>
                        <div className={styles.choiceWrapper}>
                            <Choices
                                choicesText={['はい', 'いいえ']}
                                onClick={handleChoiceClick}
                            />
                        </div>
                        <div className={styles.textBoxWrapper}>
                            <TextBox text="よろしいでしょうか？" onClick={() => {}} />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className={styles.completeSection}>
                        <TextBox
                            text="受け付けました！"
                            onClick={handleCompleteClick} // タップでホームに戻る
                        />
                    </div>
                )}
            </div>

            {step === 0 && (
                <button
                    className={styles.countBtn}
                    type="button"
                    onClick={handleClick}
                >
                    カウントする
                </button>
            )}
        </>
    )
}

export default TOP

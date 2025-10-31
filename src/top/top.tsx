import styles from './style.module.css'
import TextBox from '../components/TextBox/TextBox'
import { useState } from 'react'
import EventInput from '../components/EventInput/EventInput'
import Choices from '../components/Choices/Choices'

function TOP() {
    const [step, setStep] = useState(0)
    const [inputText, setInputText] = useState('')
    const [count, setCount] = useState(3)
    const [showReport, setShowReport] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    const handleClick = () => setStep(1)
    const handleTextClick = () => step === 1 && setStep(2)
    const handleConfirm = () => inputText.trim() !== '' && setStep(3)

    const handleChoiceClick = (text: string) => {
        if (text === 'もう大丈夫です') {
            setShowDetail(false)
            setShowReport(false)
        } else if (text === '今までのメモ') {
            alert('今までのメモを表示（仮）')
        } else if (text === '回数データ') {
            alert('回数データを表示（仮）')
        }
    }

    const handleCompleteClick = () => {
        setStep(0)
        setInputText('')
        setShowReport(false)
        setShowDetail(false)
    }

    const handlePersonClick = () => {
        setShowReport(!showReport)
        setShowDetail(false)
    }

    const handleReportClick = () => {
        setShowDetail(true)
    }

    return (
        <>
            {/* 👤 人 */}
            <div className={styles.person} onClick={handlePersonClick}>
                <div className={styles.circle}></div>
                <div className={styles.triangle}></div>
            </div>

            <div className={styles.rectangle}>
                {showReport && (
                    <div className={styles.confirmSection}>
                        {showDetail && (
                            <div className={styles.choiceWrapper}>
                                <Choices
                                    choicesText={['今までのメモ', '回数データ', 'もう大丈夫です']}
                                    onClick={handleChoiceClick}
                                />
                            </div>
                        )}
                        <div className={styles.textBoxWrapper}>
                            <TextBox
                                text={
                                    showDetail
                                        ? `あなたは今週、${inputText || '（未入力）'}を${count}回おこないました！\n詳しく聞きますか？`
                                        : `あなたは今週、${inputText || '（未入力）'}を${count}回おこないました！`
                                }
                                onClick={handleReportClick}
                            />
                        </div>
                    </div>
                )}

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
                                onClick={(text) =>
                                    text === 'はい' ? setStep(4) : setStep(2)
                                }
                            />
                        </div>
                        <div className={styles.textBoxWrapper}>
                            <TextBox text="よろしいでしょうか？" onClick={() => {}} />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className={styles.completeSection}>
                        <TextBox text="受け付けました！" onClick={handleCompleteClick} />
                    </div>
                )}
            </div>

            {step === 0 && (
                <button className={styles.countBtn} type="button" onClick={handleClick}>
                    カウントする
                </button>
            )}
        </>
    )
}

export default TOP

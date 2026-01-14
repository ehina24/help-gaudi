    import './popup.css';

    type PopupProps = {
    mode: 'simple' | 'select';
    simpleType: 'normal' | 'praiseCount' | 'praiseMe';
    onChangeSimple: (type: 'praiseCount' | 'praiseMe') => void;
    onClose: () => void;
    };

    export default function Popup({
    mode,
    simpleType,
    onChangeSimple,
    onClose,
    }: PopupProps) {
    return (
        <div className="popupRoot" onClick={onClose}>
        <div className="speechBubble">
            <div className="speechText">
            {mode === 'simple' && (
                <>
                {simpleType === 'normal' && (
                    <>
                    よく頑張りましたね。<br />
                    あなたの努力ちゃんと見えてますよ
                    </>
                )}
                {simpleType === 'praiseCount' && (
                    <>
                    今日の褒め数はこちらです。<br />
                    ちゃんと積み重なっていますよ
                    </>
                )}
                {simpleType === 'praiseMe' && (
                    <>
                    今日もここまで来たあなたはえらい。<br />
                    自分をたくさん褒めてあげてください
                    </>
                )}
                </>
            )}

            {mode === 'select' && (
                <>
                いかがなさいますか？
                </>
            )}
            </div>

            {mode === 'select' && (
            <div className="choiceBox" onClick={(e) => e.stopPropagation()}>
                <button
                className="choiceItem"
                onClick={() => onChangeSimple('praiseCount')}
                >
                <span className='arrow'>▶</span>
                今日の褒め数
                </button>

                <button
                className="choiceItem"
                onClick={() => onChangeSimple('praiseMe')}
                >
                <span className='arrow'>▶</span>
                褒めて
                </button>

                <button
                className="choiceItem"
                onClick={onClose}
                >
                <span className='arrow'>▶</span>
                何もない
                </button>

            </div>
            )}
        </div>
        </div>
    );
    }

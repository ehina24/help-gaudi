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
        <div className="messageBox" onClick={onClose}>
        {mode === 'simple' && (
            <p>
            {simpleType === 'normal' && (
                <>
                よく頑張りましたね。<br />
                あなたの努力、ちゃんと見えてますよ
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
            </p>
        )}

        {mode === 'select' && (
            <>
            <p>
                こんにちは<br />
                どうされました?
            </p>

            <div className="messageRes">
                <div>
                <div>
                    <div className="triangle"></div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onChangeSimple('praiseCount');
                    }}
                    >
                    ▶ 今日の褒め数
                    </button>
                </div>

                <div>
                    <div className="triangle"></div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onChangeSimple('praiseMe');
                    }}
                    >
                    褒めて
                    </button>
                </div>

                <div>
                    <div className="triangle"></div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    >
                    なにもない
                    </button>
                </div>
                </div>
            </div>
            </>
        )}
        </div>
    );
    }

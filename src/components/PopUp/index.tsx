import { compliment } from '../../utils/compliment';
import './popup.css';

type PopupProps = {
    mode: 'simple' | 'select';
    simpleType: 'normal' | 'praiseCount' | 'praiseMe';
    onChangeSimple: (type: 'praiseCount' | 'praiseMe') => void;
    onClose: () => void;
    monthCou?: number
};

export default function Popup({
    mode,
    simpleType,
    onChangeSimple,
    onClose,
    monthCou
}: PopupProps) {
    const randomNum = Math.floor(Math.random() * compliment.length)

    return (
        <div className="popupRoot" onClick={onClose}>
        <div className="speechBubble">
            <div className="speechText">
            {mode === 'simple' && (
                <>
                {simpleType === 'normal' && (
                    <p style={{whiteSpace: "pre-line", margin: "0 auto", width: "55%"}}>
                        {compliment[randomNum]}
                    </p>
                )}
                {simpleType === 'praiseCount' && (
                    <>
                    今月の褒め数は{monthCou}です。<br />
                    ちゃんと積み重なっていますよ
                    </>
                )}
                {simpleType === 'praiseMe' && (
                    <p style={{whiteSpace: "pre-line", margin: "0 auto", width: "55%"}}>
                        {compliment[randomNum]}
                    </p>
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
                今月の褒め数
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

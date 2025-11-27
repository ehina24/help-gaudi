import './popup.css';

export default function Popup(){
    return(
        <div>
            <h1>こんにちは</h1>
            <p className="textBox"></p>
            <input type="text" placeholder="ここに文字を入力"></input><br/>
            <button>はい</button>
            <button>いいえ</button>
        </div>
    )
}
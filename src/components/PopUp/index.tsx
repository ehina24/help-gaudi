import './popup.css';





export default function Popup(){
    return(
        <div className="messageBox">
            <p>えぶりでいホスト読みましたか？今週も面白かったですね！</p>


            <div className="response">

                <div className="button-wrapper">
                    <div>
                        <div className="triangle"></div>
                        <button>はい</button>
                    </div>
                    <div>
                        <div className="triangle"></div>
                        <button>いいえ</button>
                    </div>
                </div>


            </div>

        </div>
    )
}
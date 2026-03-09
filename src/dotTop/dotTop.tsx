import { useState } from 'react';
import styles from './style.module.css';
import Popup from '../components/PopUp';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';


export default function DotTop(){
    const [isOpen, setIsOpen] = useState(false);
    const [popupMode, setPopupMode] = useState<'simple' | 'select'>('simple');
    const [simpleType, setSimpleType] = useState<'normal' | 'praiseCount' | 'praiseMe'>('normal');
    const [monthCou, setMonthCou] = useState<number>(0)
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return null; 

    const userId = user.id; 
    const btnCells = [
    '17-2','17-3','17-4','17-5','17-6','17-7',
    '18-2','18-3','18-4','18-5','18-6','18-7',
    '19-2','19-3','19-4','19-5','19-6','19-7',
    ];
    const personCells = [
    '5-2','5-3','5-4','5-5','5-6','5-7',
    '6-2','6-3','6-4','6-5','6-6','6-7',
    '7-2','7-3','7-4','7-5','7-6','7-7',
    '8-2','8-3','8-4','8-5','8-6','8-7',
    '9-2','9-3','9-4','9-5','9-6','9-7',
    '10-2','10-3','10-4','10-5','10-6','10-7',
    '11-2','11-3','11-4','11-5','11-6','11-7',
    '12-3','12-4','12-5','12-6','12-7',
    '13-3','13-4','13-5'
    ];

    //人を押した時
    const handleClick = async (v: string) => {
        if (personCells.includes(v)) {
            setPopupMode('select');
            setIsOpen(true);

            try {
                const res = await api.monthly(userId)
                console.log(res);
                setMonthCou(res.count)
            } catch (error) {
                console.log(error);
            }
            return;
        }
    //ボタンを押した時
        if(btnCells.includes(v)){
            setPopupMode('simple');
            setIsOpen(true);

            try {
                const res = await api.addCount(userId)
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            return;
        }
    };

    const rows=[
        ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8'],
        ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8'],
        ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8'],
        ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8'],
        ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8'],
        ['6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8'],
        ['7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7', '7-8'],
        ['8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8'],
        ['9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7', '9-8'],
        ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8'],
        ['11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7', '11-8'],
        ['12-1', '12-2', '12-3', '12-4', '12-5', '12-6', '12-7', '12-8'],
        ['13-1', '13-2', '13-3', '13-4', '13-5', '13-6', '13-7', '13-8'],
        ['14-1', '14-2', '14-3', '14-4', '14-5', '14-6', '14-7', '14-8'],
        ['15-1', '15-2', '15-3', '15-4', '15-5', '15-6', '15-7', '15-8'],
        ['16-1', '16-2', '16-3', '16-4', '16-5', '16-6', '16-7', '16-8'],
        ['17-1', '17-2', '17-3', '17-4', '17-5', '17-6', '17-7', '17-8'],
        ['18-1', '18-2', '18-3', '18-4', '18-5', '18-6', '18-7', '18-8'],
        ['19-1', '19-2', '19-3', '19-4', '19-5', '19-6', '19-7', '19-8'],
        ['20-1', '20-2', '20-3', '20-4', '20-5', '20-6', '20-7', '20-8']
    ]

    const getClass=(v:string)=>{
        return styles[`type${v}`];
    };

    const getImageSrc=(v:string)=>{
        return `/${v}.svg`
    };

    return(
        <div className={styles.bgWrapper}>
            <div className={styles.container}>
                {rows.map((row,rowIndex)=>
                    row.map((v,colIndex)=>(
                        
                <img
                key={`${rowIndex}-${colIndex}`}
                src={getImageSrc(v)}
                className={`${styles.cell} ${getClass(v)}`}
                onClick={()=>handleClick(v)}
                />
                    ))
                )}
            </div>

            {isOpen && (
                <div className={styles.popupWrapper} onClick={()=>setIsOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Popup
                        mode={popupMode}
                        simpleType={simpleType}
                        onChangeSimple={(type) => {
                            setSimpleType(type);
                            setPopupMode('simple');
                        }}
                        monthCou={monthCou}
                        onClose={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
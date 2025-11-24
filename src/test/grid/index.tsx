
import { createColor, createGrid } from '../../utils/CreateGrid';
import styles from './styles.module.css'

const rows = 20
const cols = 8

const data = createGrid(rows, cols);

console.log(data);

export default function Grid() {
    return(
        <>
            <div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`
                }}
            >
                {data.map((row, i) => 
                    row.map((col, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={styles.col}
                            // 現在はbackgroundでやっているが本来なら画像
                            style={{background: `${createColor(col)}`}}
                            // 画像の例
                            // 1-1.svgなどに画像を名前を変更して
                            // style={{backgroundImage: `url(/images/top-${col}.svg)`}}
                        >
                            
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
export function createGrid(rows: number, cols: number): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(`${i+1}-${j+1}`);
        }
        grid.push(row);
    }
    return grid;
}


export function createColor(v: string): string {
    switch (v) {
        case '1-1':
        case '1-2':
        case '1-3':
        case '2-1':
        case '2-2':
        case '2-3':
        case '3-1':
        case '3-2':
        case '3-3':
            return '#9E00B3';
        case '1-4':
        case '2-4':
        case '3-4':
        case '4-1':
        case '4-2':
        case '4-3':
        case '4-4':
        case '5-1':
        case '5-2':
        case '6-1':
        case '6-2':
        case '7-1':
        case '7-2':
        case '8-1':
        case '8-2':
        case '9-1':
        case '9-2':
        case '12-7':
        case '12-8':
        case '13-8':
            return '#33FFCF';
        case '13-6':
        case '13-7':
            return '#979797';
        default:
            return '';
    }
}
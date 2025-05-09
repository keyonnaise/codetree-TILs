const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = Number.NEGATIVE_INFINITY;
let obj = {};

for (let startRow = 0; startRow < n; startRow++) {
    for (let startCol = 0; startCol < m; startCol++) {
        for (let endRow = startRow; endRow < n; endRow++) {
            for (let endCol = startCol; endCol < m; endCol++) {
                if(startRow === 0 && startCol === 0 && endRow === n - 1 && endCol === m - 1) continue;

                // 시작 점과 끝 점 구한 후 내부 값 값 구하기
                const value = getValue(grid, [startRow, startCol], [endRow, endCol]);
                const position = `${startRow}-${startCol}-${endRow}-${endCol}`;

                obj[position] = value;
            }
        }
    }
}

const keys = Object.keys(obj);

for (let i = 0; i < keys.length; i++) {
    const key1 = keys[i];
    const value1 = obj[key1];
    const [startRow1, startCol1, endRow1, endCol1] = key1.split('-').map(Number);

    for (let j = i + 1; j < keys.length; j++) {
        const key2 = keys[j];
        const value2 = obj[key2];
        const [startRow2, startCol2, endRow2, endCol2] = key2.split('-').map(Number);

        // 겹치지 않는 경우에만 계산
        if (!isOverlap(startRow1, startCol1, endRow1, endCol1, startRow2, startCol2, endRow2, endCol2)) {
            const result = value1 + value2;
            answer = Math.max(result, answer);
        }
    }
}

console.log(answer);

function getValue(grid, start, end) {
    let result = 0;
    for (let row = start[0]; row <= end[0]; row++) {
        for (let col = start[1]; col <= end[1]; col++) {
            result += grid[row][col];
        }
    }
    return result;
}

function isOverlap(startRow1, startCol1, endRow1, endCol1, startRow2, startCol2, endRow2, endCol2) {
    return !(endRow1 < startRow2 || endRow2 < startRow1 || endCol1 < startCol2 || endCol2 < startCol1);
}
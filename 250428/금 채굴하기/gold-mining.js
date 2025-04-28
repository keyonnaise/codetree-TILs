const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = 0;

// 그리드 순회
for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        for(let k = 0; k < n; k++) {
            const numberOfGold = mining(x, y, k);
            const cost = getCost(k);
            
            if (numberOfGold * m - cost >= 0) {
                answer = Math.max(answer, numberOfGold);
            }
        }
    }
}

console.log(answer);

/**
 * @param {number} x - x 좌표 값
 * @param {number} y - y 좌표 값
 * @param {number} k - 채굴 범위
 * @returns {number}
 * @description 범위 내 금의 개수를 반환합니다.
 */
function mining(x, y, k) {
    const xMin = x - k;
    const xMax = x + k;
    const yMin = y - k;
    const yMax = y + k;
    let count = 0;

    for (let i = 0; i < n; i++) {
        const diff = Math.abs(y - i);

        if (yMin <= i && yMax >= i) {
            for (let j = 0; j < n; j++) {
                if (xMin + diff <= j && xMax - diff >= j) {
                    const col = grid[i][j];
                    count += col;
                }
            }
        }
    }

    return count;
}

function getCost(k) {
    return k ** 2 + (k + 1) ** 2;
}
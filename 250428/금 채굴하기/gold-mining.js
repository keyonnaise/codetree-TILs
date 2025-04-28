const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
let answer = 0;

// 그리드 순회
for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        for(let k = 0; k < n * 2; k++) {
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
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // 현재 셀 (i, j)와 중심 (y, x) 사이의 맨해튼 거리 계산
            const distance = Math.abs(i - y) + Math.abs(j - x);
            // 거리가 k 이하이면 마름모 영역에 포함됨
            if (distance <= k) {
                count += grid[i][j]; // 해당 셀의 금 개수 더하기
            }
        }
    }

    return count;
}

function getCost(k) {
    return k ** 2 + (k + 1) ** 2;
}
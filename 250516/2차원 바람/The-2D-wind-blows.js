const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, q] = input[0].split(" ").map(Number);
const grid = input.slice(1, 1 + n).map(line => line.split(" ").map(Number));
const winds = input.slice(1 + n, 1 + n + q).map(line => line.split(" ").map(Number));

// Please Write your code here.
let answer;

for ([r1, c1, r2, c2] of winds) {
    const gridAfterRotation = rotateBoundary(answer || grid, r1, c1, r2, c2);
    answer = updateCellsWithAverages(gridAfterRotation, r1, c1, r2, c2);
}

console.log(
    answer
        .map((current) => current.join(" "))
        .join("\n")
);

function rotateBoundary(grid, _r1, _c1, _r2, _c2) {
    const cloned = JSON.parse(JSON.stringify(grid));
    const r1 = _r1 - 1;
    const c1 = _c1 - 1;
    const r2 = _r2 - 1;
    const c2 = _c2 - 1;

    for (let i = 0; i < cloned.length; i++) {
        if (!inRange(i, r1, r2)) continue;

        for (let j = 0; j < cloned[i].length; j++) {
            if (!inRange(j, c1, c2)) continue;

            const value = grid[i][j]; // 원본 grid에서 값을 읽음

            // 좌상단 모서리
            if (i === r1 && j === c1) {
                cloned[i][j + 1] = value;
            }
            // 우상단 모서리
            else if (i === r1 && j === c2) {
                cloned[i + 1][j] = value;
            }
            // 우하단 모서리
            else if (i === r2 && j === c2) {
                cloned[i][j - 1] = value;
            }
            // 좌하단 모서리
            else if (i === r2 && j === c1) {
                cloned[i - 1][j] = value;
            }
            // 상단 변 (모서리 제외)
            else if (i === r1) {
                cloned[i][j + 1] = value;
            }
            // 하단 변 (모서리 제외)
            else if (i === r2) {
                cloned[i][j - 1] = value;
            }
            // 우측 변 (모서리 제외)
            else if (j === c2) {
                cloned[i + 1][j] = value;
            }
            // 좌측 변 (모서리 제외)
            else if (j === c1) {
                cloned[i - 1][j] = value;
            }
        }
    }

    return cloned;
}

function updateCellsWithAverages(grid, _r1, _c1, _r2, _c2,) {
    const cloned = JSON.parse(JSON.stringify(grid));
    const r1 = _r1 - 1;
    const c1 = _c1 - 1;
    const r2 = _r2 - 1;
    const c2 = _c2 - 1;

    const numRows = grid.length;
    const numCols = grid[0].length;

    // 인접 방향 (상, 하, 좌, 우)
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
            let total = cloned[i][j];
            let count = 1;

            // 인접한 칸들의 값을 더함
            for (let k = 0; k < 4; k ++) {
                const neighborRow = i + dr[k];
                const neighborCol = j + dc[k];

                // 인접한 칸이 전체 그리드 범위 내에 있는지 확인
                if (inRange(neighborRow, 0, numRows - 1) && inRange(neighborCol, 0, numCols - 1)) {
                    total += grid[neighborRow][neighborCol];
                    count++;
                }
            }

            cloned[i][j] = Math.floor(total / count);
        }
    }

    return cloned;
}

function inRange(value, min, max) {
    return value >= min && value <= max;
}
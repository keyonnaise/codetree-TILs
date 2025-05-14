const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.

let answer = -1;

for (let x1 = 0; x1 < m; x1++) {
    for (let y1 = 0; y1 < n; y1++) {
        for (let x2 = x1; x2 < m; x2++) {
            for (let y2 = y1; y2 < n; y2++) {
                answer = Math.max(draw(x1, y1, x2, y2) || -1, answer);
            }
        }
    }
}

console.log(answer);

function draw(x1, y1, x2, y2) {
    let result = 0;
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            if (grid[j][i] <= 0) return;
            result = (x2 - x1 + 1) * (y2 - y1 + 1);
        }
    }
    return result;
}
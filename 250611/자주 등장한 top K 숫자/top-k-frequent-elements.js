const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].trim().split(' ').map(Number);

// Please Write your code here.
const count = new Map();

for (const item of arr) {
    if (count.has(item)) {
        count.set(item, count.get(item) + 1);
    } else {
        count.set(item, 1);
    }
}

const sorted = Array.from(count.entries()).sort((a, b) => (b[1] - a[1]) || (b[0] - a[0]));

let answer = "";
for (let i = 0; i < k; i++) {
    answer += `${sorted[i][0]} `
}

console.log(answer);
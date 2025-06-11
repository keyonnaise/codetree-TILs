const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

// Please Write your code here.
const count = new Map();
let answer = 0;

for (const item of arr) {
    const diff = k - item;
    
    if (count.has(diff)) {
        answer += count.get(diff);
    }

    if (count.has(item)) {
        count.set(item, count.get(item) + 1);
    } else {
        count.set(item, 1);
    }
}

console.log(answer);
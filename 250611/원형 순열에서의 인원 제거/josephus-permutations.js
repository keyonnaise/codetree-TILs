const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const [n, k] = input[0].split(" ").map(Number);
// Please Write your code here.

const array = [];
for (let i = 0; i < n; i++) {
    array.push(i + 1);
}

let answer = "";
let cursor = k - 1;

while (array.length !== 0) {
    answer += `${array.splice(cursor, 1)} `;
    cursor = (cursor + k - 1) % array.length;
}

console.log(answer);
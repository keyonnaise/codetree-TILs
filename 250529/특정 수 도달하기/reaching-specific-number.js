const fs = require("fs");
const input = fs.readFileSync(0).toString();

const numbers = input.trim().split(" ").map(Number);

// Please Write your code here.
let total = 0;
let count = 0;

for (const number of numbers) {
    if (number >= 250) break;
    
    total += number;
    count++;
}

console.log(total, total / count);
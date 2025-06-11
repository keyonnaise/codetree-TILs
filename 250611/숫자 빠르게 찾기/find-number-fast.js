const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);
const queries = input.slice(2, 2 + m).map(Number);

// Please Write your code here.

function search(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            return mid;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

// 풀이
for (const query of queries) {
    const index = search(numbers, query);
    console.log(index !== -1 ? index + 1 : -1);
}
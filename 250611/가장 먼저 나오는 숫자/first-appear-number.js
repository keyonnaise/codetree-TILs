const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const queries = input[2].split(' ').map(Number);

// Please Write your code here.

function search(array, target) {
    let left = 0;
    let right = array.length - 1;
    let cursor = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] >= target) {
            cursor = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return arr[cursor] === target ? cursor : -1;
}

// 풀이
for (const query of queries) {
    const index = search(arr, query);
    console.log(index !== -1 ? index + 1 : -1);
}
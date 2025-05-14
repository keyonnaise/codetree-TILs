const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const [n, t] = input[0].split(' ').map(Number);
const u = input[1].split(' ').map(Number);
const d = input[2].split(' ').map(Number);

// Please write your code here.
const clonedU = u.slice(0, n);
const clonedD = d.slice(0, n);
let count = 0;

while (count !== t) {
    move();
    count++;

    if (count === t) {
        console.log(clonedU.join(" "));
        console.log(clonedD.join(" "));
    }
}

function move () {
    clonedU.unshift(clonedD.pop());
    clonedD.unshift(clonedU.pop());
}

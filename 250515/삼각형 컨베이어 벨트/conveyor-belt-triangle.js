const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, t] = input[0].split(' ').map(Number);
const l = input[1].trim().split(' ').map(Number);
const r = input[2].trim().split(' ').map(Number);
const d = input[3].trim().split(' ').map(Number);

// Please Write your code here.
let count = 0;

while (count <= t) {
    move();
    count++;
    
    if (count === t) {
        console.log(l.join(" "));
        console.log(r.join(" "));
        console.log(d.join(" "));
    }
}

function move() {
    r.unshift(l.pop());
    d.unshift(r.pop());
    l.unshift(d.pop());
}
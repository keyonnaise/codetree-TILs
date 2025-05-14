const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const [n, t] = input[0].split(' ').map(Number);
const u = input[1].split(' ').map(Number);
const d = input[2].split(' ').map(Number);

// Please write your code here.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async function() {
    let count = 0;

    while (count !== t) {
        await delay(1000);
        
        move();
        count++;

        if (count === t) {
            console.log(u.join(" "));
            console.log(d.join(" "));
        }
    }
})()

function move () {
    u.unshift(d.pop());
    d.unshift(u.pop());
}

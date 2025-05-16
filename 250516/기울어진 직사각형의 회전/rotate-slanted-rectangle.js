const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
let grid = [];
for (let i = 1; i <= n; i++) {
    grid.push(input[i].trim().split(' ').map(Number));
}

const [r, c, m1, m2, m3, m4, dir] = input[n + 1].split(' ').map(Number);

// Please Write your code here.
const rotated = rotateBoundary(grid, r, c, m1, m2, m3, m4, dir);

console.log(
    rotated
        .map((current) => current.join(" "))
        .join("\n")
)

function rotateBoundary(grid, _r, _c, m1, m2, m3, m4, dir) {
    const cloned = grid.map((row) => [...row]);
    const r = _r - 1;
    const c = _c - 1;
    let prevR = r;
    let prevC = c;

    const dx = dir === 1 ? 
        [
            ...Array.from({ length: m2 }, () => -1),
            ...Array.from({ length: m1 }, () => 1),
            ...Array.from({ length: m4 }, () => 1),
            ...Array.from({ length: m3 }, () => -1),
        ] : 
        [
            ...Array.from({ length: m1 }, () => 1),
            ...Array.from({ length: m2 }, () => -1),
            ...Array.from({ length: m3 }, () => -1),
            ...Array.from({ length: m4 }, () => 1),
        ];
    const dy = [
        ...Array.from({ length: m1 }, () => -1),
        ...Array.from({ length: m2 }, () => -1),
        ...Array.from({ length: m3 }, () => 1),
        ...Array.from({ length: m4 }, () => 1)
    ];

    const length = m1 + m2 + m3 + m4;
    for (let i = 0; i < length; i++) {
        const value = grid[prevR][prevC];
        const currnetR = prevR + dy[i]
        const currentC = prevC + dx[i]
        
        cloned[currnetR][currentC] = value;
        prevR = currnetR;
        prevC = currentC;
    }

    return cloned;
}
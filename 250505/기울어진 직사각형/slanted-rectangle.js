const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

let n = Number(input[0]);
let grid = [];
for (let i = 1; i <= n; i++) {
    grid.push(input[i].split(' ').map(Number));
}

// Please Write your code here.
let answer = 0;

for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
        let value = 0;

        for (let distance1 = 1; distance1 < n; distance1++) {
            const [value1, row1, col1] = getNextValue(grid, row, col, distance1, 0);

            if (value1 === -1) {
                value = -1;
                break;
            }

            for (let distance2 = 1; distance2 < n; distance2++) {
                const [value2, row2, col2] = getNextValue(grid, row1, col1, distance2, 1);
                const [value3, row3, col3] = getNextValue(grid, row2, col2, distance1, 2);
                const [value4] = getNextValue(grid, row3, col3, distance2, 3);

                if(value2 === -1 || value3 === -1 || value4 === -1) {
                    value = -1;
                    break;
                }

                value = value1 + value2 + value3 + value4;
                answer = Math.max(value, answer);
            }
        }
    }
}

console.log(answer);

function getNextValue(grid, row, col, distance, direction) {
    let value = 0;
    for (let i = 0; i < distance; i++) {
        let nextValue = 0;

        switch (direction) {
            case 0: {
                row -= 1;
                col += 1;
                break;
            };
            case 1: {
                row -= 1;
                col -= 1;
                break;
            };
            case 2: {
                row += 1;
                col -= 1;
                break;
            };
            case 3: {
                row += 1;
                col += 1;
                break;
            };
            // no default
        }

        nextValue = grid[row]?.[col] || -1;

        if (nextValue === -1) {
            value = nextValue;
            break;
        };

        value += nextValue;
    }
    
    return [value, row, col];
}
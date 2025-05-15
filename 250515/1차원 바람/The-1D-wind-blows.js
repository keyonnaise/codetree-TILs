const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, q] = input[0].split(' ').map(Number);
const building = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const winds = input.slice(1 + n, 1 + n + q).map(line => {
  const [r, d] = line.split(' ');
  return [Number(r), d];
});

// Please write your code here.
const fixedBuilding = building.map((floor) => floor.slice(0, m));

for ([row, direction] of winds) {
    const index = row - 1;
    fixedBuilding[index] = getShiftRowArray(fixedBuilding[index], direction);
    
    // 아래층으로 전파 처리
    let indexForLower = index - 1;
    let directionForLower = getReversedDirection(direction);

    // 빌딩 가장 아래층(0번 인덱스)에 도달할 때까지 반복
    while (indexForLower >= 0) {
        if (canPropagateWind(fixedBuilding[indexForLower + 1], fixedBuilding[indexForLower])) {
            fixedBuilding[indexForLower] = getShiftRowArray(fixedBuilding[indexForLower], directionForLower);
            
            indexForLower--;
            directionForLower = getReversedDirection(directionForLower);
        } else {
            break;
        }
    }

    // 위층으로 전파 처리
    let indexForUpper = index + 1;
    let directionForUpper = getReversedDirection(direction);

    // 빌딩 가장 위층(n - 1번 인덱스)에 도달할 때까지 반복
    while (indexForUpper < n) {
        if (canPropagateWind(fixedBuilding[indexForUpper - 1], fixedBuilding[indexForUpper])) {
            fixedBuilding[indexForUpper] = getShiftRowArray(fixedBuilding[indexForUpper], directionForUpper);
            
            indexForUpper++;
            directionForUpper = getReversedDirection(directionForUpper);
        } else {
            break;
        }
    }
}

console.log(
    fixedBuilding
        .map(floor => floor.join(" "))
        .join("\n")
);

function getShiftRowArray(array, direction) {
    const cloned = [...array];

    if (array.length <= 1) {
    };
    
    switch (direction) {
        // L: 오른쪽 끝 요소가 왼쪽 처음으로 이동
        case "L": {
            cloned.unshift(cloned.pop());
            break;
        }

        // R: 왼쪽 처음 요소가 오른쪽 끝으로 이동
        case "R": {
            cloned.push(cloned.shift());
            break;
        }
    }

    return cloned;
}

function getReversedDirection(direction) {
    if (direction === "L") return "R";
    if (direction === "R") return "L";
    return direction;
}

function canPropagateWind(sourceArray, targetArray) {
    for (let i = 0; i < targetArray.length; i++) {
        if (targetArray[i] === sourceArray[i]) return true;
    }
    return false;
}
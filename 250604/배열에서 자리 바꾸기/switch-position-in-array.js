const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
const q = Number(input[1]);
const commands = input.slice(2, 2 + q).map(line => line.split(' ').map(Number));
// Please Write your code here.

/**
 * LinkedList의 개별 노드를 나타내는 클래스
 * @template T 노드에 저장될 데이터의 타입
 */
class Node {
    data
    next

    /**
     * Node 인스턴스를 생성합니다.
     * @param data 노드에 저장할 데이터
     * @param next 다음 노드를 가르키는 참조 (기본값: null)
     */
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

/**
 * LinkedList 자료구조를 구현한 클래스
 * @template T 리스트에 저장될 데이터의 타입
 */
class LinkedList {
    head;
    tail;
    count;

    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    /**
     * 현재 리스트의 크기(노드 개수)를 반환합니다.
     * @returns {number} 리스트의 크기
     */
    getSize() {
        return this.count;
    }

    /**
     * 지정된 인덱스의 노드를 반환합니다.
     * 리스트의 중간 지점을 기준으로 head 또는 tail에서 탐색을 시작하여 최적화합니다.
     * @param index 찾을 노드의 인덱스
     * @returns 해당 인덱스의 노드 또는 null
     */
    getNodeAt(index) {
        if (this.isEmpty() || index < 0 || index > this.count) {
            return null;
        }

        const middle = Math.floor(this.count / 2);
        let current = null;

        // Case 1: 인덱스가 리스트의 앞부분에 가까울 경우 head에서부터 순방향 탐색
        if (index <= middle) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current ? current.next : null;
            }
        }
        // Case 2: 인덱스가 리스트의 뒷부분에 가까울 경우 tail에서부터 역방향 탐색
        else {
            current = this.tail;
            for (let i = this.count - 1; i > index; i--) {
                current = current ? current.prev : null;
            }
        }

        return current;
    }

    /**
     * 리스트의 모든 데이터를 배열로 변환 (순방향)
     * @returns 데이터 배열
     */
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    /**
     * 리스트의 끝에 새로운 노드를 추가합니다.
     * @param data 추가할 데이터
     */
    append(data) {
        const newNode = new Node(data);

        // Case 1: 리스트가 비어있을 때
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        // Case 2: 리스트에 값이 있을 떄
        else {
            if (this.tail) {
                this.tail.next = newNode;
            }

            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.count += 1;
    }

    /**
     * 리스트의 시작에 새로운 노드를 추가합니다.
     * @param data 추가할 데이터
     */
    prepend(data) {
        const newNode = new Node(data);

        // Case 1: 리스트가 비어있을 때
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        // Case 2: 리스트에 값이 있을 떄
        else {
            if (this.head) {
                this.head.prev = newNode;
            }

            newNode.next = this.head;
            this.head = newNode;
        }

        this.count += 1;
    }

    /**
     * 지정된 인덱스에 새로운 노드를 삽입합니다.
     * @param data 삽입할 데이터
     * @param index 삽입할 위치 (0부터 시작)
     * @returns 삽입 성공 시 true, 실패 시 false
     */
    insertAt(data, index) {
        if (index < 0 || index > this.count) {
            return false;
        }

        if (index === 0) {
            this.prepend(data);
            return true;
        }

        if (index === this.count) {
            this.append(data);
            return true;
        }

        // index 위치의 기존 노드를 찾아 그 '앞'에 삽입
        const currentNode = this.getNodeAt(index);
        if (!currentNode || !currentNode.prev) {
            return false;
        }

        const previousNode = currentNode.prev;
        const newNode = new Node(data);

        newNode.next = currentNode;
        previousNode.next = newNode;
        newNode.prev = previousNode;
        currentNode.prev = newNode;

        this.count += 1;
        
        return true;
    }

    /**
     * 지정된 인덱스의 노드를 삭제하고 해당 노드의 데이터를 반환합니다.
     * @param index 삭제할 노드의 인덱스 (0부터 시작)
     * @returns 삭제된 노드의 데이터 또는 실패 시 null
     */
    removeAt(index) {
        if (this.isEmpty() || index < 0 || index >= this.count) {
            return null;
        }

        let removedNode = null;

        // Case 1: 첫 번째 노드 삭제
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head ? this.head.next : null;
            
            if (this.head) {
                this.head.prev = null;
            } 
            // 노드가 하나뿐이었던 경우
            else {
                this.tail = null;
            }
        }
        // Case 2: 마지막 노드 삭제
        else if (index === this.count - 1) {
            removedNode = this.tail;
            this.tail = this.tail ? this.tail.prev : null;

            if (this.tail) {
                this.tail.next = null;
            } 
            // 노드가 하나뿐이었던 경우 (이론상 index === 0에서 처리됨)
            else {
                this.head = null;
            }
        }
        // Case 3: 중간 노드 삭제
        else {
            removedNode = this.getNodeAt(index);
            if (!removedNode || !removedNode.prev || !removedNode.next) {
                return null;
            }

            const previousNode = removedNode.prev;
            const nextNode = removedNode.next;

            previousNode.next = nextNode;
            nextNode.prev = previousNode;
        }

        this.count -= 1;

        return removedNode ? removedNode.data : null;
    }

    /**
     * 리스트가 비어있는지 확인합니다.
     * @returns {boolean} 리스트가 비어있으면 true, 아니면 false
     */
    isEmpty() {
        return this.count === 0;
    }
}

// 1. LinkedList 인스턴스 생성 및 초기화
const linkedList = new LinkedList();
for (let i = 0; i < n; i++) {
    linkedList.append(i + 1);
}

// 2. 외부 '포인터 맵' 생성
// O(N)의 초기 순회 비용이 발생하지만, 쿼리 처리를 O(1)로 만들어줌
const nodePointers = {};
let currentNode = linkedList.head;
while (currentNode) {
    nodePointers[currentNode.data] = currentNode;
    currentNode = currentNode.next;
}


// 3. Q개의 명령 처리
for (const [a, b, c, d] of commands) {
    // 1. 외부 포인터 맵을 이용해 O(1)에 노드 찾기
    const nodeA = nodePointers[a];
    const nodeB = nodePointers[b];
    const nodeC = nodePointers[c];
    const nodeD = nodePointers[d];

    // 2. 경계 노드 저장 (포인터 직접 조작)
    const prevA = nodeA.prev;
    const nextB = nodeB.next;
    const prevC = nodeC.prev;
    const nextD = nodeD.next;

    // Case 1: 인접한 경우
    if (nextB === nodeC) {
        if (prevA) {
            prevA.next = nodeC
        };
        nodeC.prev = prevA;
        nodeD.next = nodeA;
        nodeA.prev = nodeD;
        nodeB.next = nextD;
        if (nextD) {
            nextD.prev = nodeB
        };
    }
    // Case 2: 떨어진 경우
    else {
        if (prevA) {
            prevA.next = nodeC
        };
        nodeC.prev = prevA;
        if (nextB) {
            nextB.prev = nodeD
        };
        nodeD.next = nextB;
        if (prevC) {
            prevC.next = nodeA
        };
        nodeA.prev = prevC;
        if (nextD) {
            nextD.prev = nodeB
        };
        nodeB.next = nextD;
    }

    // linkedList 객체의 head/tail 포인터 직접 갱신
    if (prevA === null) {
        linkedList.head = nodeC;
    } else if (prevC === null) {
        linkedList.head = nodeA;
    }

    if (nextB === null) {
        linkedList.tail = nodeD;
    } else if (nextD === null) {
        linkedList.tail = nodeB;
    }
}

// 4. 최종 결과 출력
// 클래스의 toArray 메서드를 사용
console.log(linkedList.toArray().join(" ").trim());
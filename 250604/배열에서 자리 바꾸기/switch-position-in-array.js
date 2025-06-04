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

    constructor(size) {
        this.head = new Node(null);
        this.tail = new Node(null);
        this.count = 0;

        this.head.next = this.tail;
        this.tail.prev = this.head;

        let currentNode = this.head;
        for (let i = 1; i <= size; i++) {
            const newNode = new Node(i);
            currentNode.next = newNode;
            newNode.prev = currentNode;
            newNode.next = this.tail;

            this.tail.prev = newNode;
            this.count++;

            currentNode = newNode;
        }
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
        let iterNode = this.head.next;
        while (iterNode !== this.tail) {
            result.push(iterNode.data);
            iterNode = iterNode.next;
        }
        return result;
    }
}

// 1. LinkedList 인스턴스 생성 및 초기화
const linkedList = new LinkedList(n);

// 2. 외부 '포인터 맵' 생성
// O(N)의 초기 순회 비용이 발생하지만, 쿼리 처리를 O(1)로 만들어줌
const nodePointers = {};
let currentNode = linkedList.head.next;
while (currentNode !== linkedList.tail) {
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
        prevA.next = nodeC;
        nodeC.prev = prevA;

        nodeD.next = nodeA;
        nodeA.prev = nodeD;

        nodeB.next = nextD;
        nextD.prev = nodeB;
    }
    // Case 2: 떨어진 경우
    else {
        prevC.next = nodeA;
        nodeA.prev = prevC;

        nodeB.next = nextD;
        nextD.prev = nodeB;

        prevA.next = nodeC;
        nodeC.prev = prevA;

        nodeD.next = nextB;
        nextB.prev = nodeD;
    }
}

// 4. 최종 결과 출력
// 클래스의 toArray 메서드를 사용
console.log(linkedList.toArray().join(" "));
class Node {
    // 클래스 내의 변수 = 프로퍼티 
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null; // 연결 리스트의 시작 노드
        this.count = 0; // 총 저장된 노드의 수 
    }

    printAll() {
        let currentNode = this.head;
        let text = '[';
        
        while (currentNode != null) {
            text += currentNode.data;
            currentNode = currentNode.next;

            if (currentNode != null) {
                text += ',';
            }
        }
        text += ']';
        console.log(text);
    }

    clear() {
        this.head = null; // 참조하는것이 없게 만들어준다.
        this.count = 0;
    }

    insertAt(index, data) { // 삽입할 위치, 삽입할 데이터 
        if (index > this.count || index < 0) {
            // 예외 처리 
            // 1. 연결 리스트 보다 큰 곳에 삽입하는 경우
            // 2. 음수 위치에 삽입하는 경우 
            throw new Error("범위를 넘어갔습니다.");
        } 

        let newNode = new Node(data);

        if (index === 0) {
            // 1. 가장 앞부분에 삽입
            // => 새로 삽입하는 노드가 head가 되는 경우

            newNode.next = this.head; // 새로 생성한 node의 next가 head를 가르키게 해준다. 
            this.head = newNode; 
            
        } else {
            // 2. 가장 앞부분을 제외한 나머지 부분에 삽입하는 경우
            // => head 노드에서 next로 목표 인덱스까지 계속 참조해서 가는 경우
            let currentNode = this.head;

            for (let i = 0; i < index - 1; i++){
                // 목표 인덱스 바로 전까지 next를 이용해 currentNode를 이동시킨다. 
                   // 목표 인덱스가 3이면 두번째 떨어진 노드까지 접근하여 두번째 노드의 다음 노드를 알아온다.
                currentNode = currentNode.next; 
            }

            newNode.next = currentNode.next; // 새로운 노드를 들어갈 위치에 전에 있던 노드의 다음 노드를 가르키게 하고
            currentNode.next = newNode // 들어갈 위치 전에 있던 노드의 next를 새로운 노드로 해준다. 
            
        }

        this.count++;
    }

    insertLast(data){
        this.insertAt(this.count, data);
    }

    deleteAt(index){
        if(index >= this.count || index < 0){
            throw new Error("제거할 수 없습니다.");
        }

        let currentNode = this.head;

        if (index == 0) {
            //1. head node 즉 첫번째 노드를 삭제하는 경우 
            let deletedNode = this.head; // 삭제할 노드 
            this.head = this.head.next;
            this.count--;
            return deletedNode;
        } else { // 2. 그 외 노드를 제거하는 경우 
            for(let i = 0; i < index - 1; i++){
                currentNode = currentNode.next; // currentNode : 제거할 노드의 이전 노드 
            }
            
             // currentNode : 제거할 노드의 이전 노드 
            let deletedNode = currentNode.next; 
            currentNode.next = currentNode.next.next; // 제거할 이전 노드의 다음 노드가, 제거할 노드의 다음 노드를 가르키게 한다. 
            this.count--;
            return deletedNode;
        }
    }

    deleteLast(){
        return this.deleteAt(this.count - 1); // 데이터가 3개라면 2번 인덱스가 마지막 데이터이기에
    }

    getNodeAt(index){ // 해당 인덱스의 데이터를 읽음
        if(index >= this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){ // 해당 인덱스까지 순회
            currentNode = currentNode.next;
        }

        return currentNode;
    }
}

export { Node, LinkedList };


class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev; // 이중연결리스트(해당 노드의 다음노드뿐만 아니라 이전 노드도 가리킬 수 있도록)
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // 가장 첫번째 노드 (리스트 시작)
    this.tail = null; // 가장 마지막 노드 (가장 먼저 들어온 노드를 찾기 위해서. 리스트 마지막 )
    this.count = 0;
  }

  printAll() {
    let currentNode = this.head;
    let text = "[";

    while (currentNode != null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode != null) {
        text += ", ";
      }
    }

    text += "]";
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let newNode = new Node(data);

    if (index == 0) {
      newNode.next = this.head;
      if (this.head != null) {
        // 이전 노드가 있을 때
        this.head.prev = newNode; // 기존 노드의 이전노드를 새로들어온 노드로 지정
      }
      this.head = newNode;
    } else if (index == this.count) {
      // 마지막에 삽입하는 경우 따로 처리 (tail 값 관련 )
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      let currentNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
      currentNode.next = newNode;
      newNode.next.prev = newNode;
    }

    if (newNode.next == null) {
      // 마지막 노드라면
      // index == 0일 때 와 index == this.count가 분리 되어있는데 둘 다 적용해야하는 코드라 따로 뺌
      this.tail = newNode;
    }
    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("제거할 수 없습니다.");
    }

    let currentNode = this.head;

    if (index == 0) {
      let deletedNode = this.head;
      if (this.head.next == null) {
        // 데이터가 1개일 때
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      this.count--;
      return deletedNode;
    } else if (index == this.count - 1) {
      // 마지막 노드
      let deletedNode = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    } else {
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }

      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      currentNode.next.prev = currentNode;
      this.count--;
      return deletedNode;
    }
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}

export { Node, DoublyLinkedList };

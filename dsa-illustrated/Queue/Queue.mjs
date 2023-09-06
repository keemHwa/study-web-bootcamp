import { DoublyLinkedList } from "./DoublyLinkedList.mjs";

class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(data) {
    // 데이터 삽입 (큐이기에 무조건 앞으로 insert)
    this.list.insertAt(0, data);
  }

  dequeue() {
    // 데이터 제거 (큐이기에 마지막 데이터가 삭제)
    try {
      return this.list.deleteLast();
    } catch (e) {
      return null;
    }
  }

  front() {
    // 데이터 참조
    return this.list.tail;
  }

  isEmpty() {
    // 비었는지 참조
    return this.list.count == 0;
  }
}

export { Queue };

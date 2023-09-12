import { DoublyLinkedList } from "../Queue/DoublyLinkedList.mjs";

class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    this.arr = [];
    for (let i = 0; i < 10; i++) {
      this.arr[i] = new DoublyLinkedList(); // 각 인덱스마다 빈 연결 리스트 생성
    }
  }

  hashFunction(number) {
    return number % 10;
  }

  set(key, value) {
    this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
    /*
    인덱스 | 데이터 
    ----------------
    0      | 빈 연결리스트 =(key-value)-->(key-value)--> . . .
    1      | 빈 연결리스트 = key-value)-->(key-value)--> . . .
    .
    .
    .
 */
  }

  get(key) {
    let currentNode = this.arr[this.hashFunction(key)].head;
    while (currentNode != null) {
      if (currentNode.data.key == key) {
        // 리스트를 순회하면서 해당 데이터의 key가 get()함수의 인자로 받은 key와 같은지 비교
        return currentNode.data.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  remove(key) {
    let list = this.arr[this.hashFunction(key)];
    let currentNode = list.head;
    let deletedIndex = 0; // key만 알고 연결리스트에 몇번째 인덱스인지는 모르기때문에
    while (currentNode != null) {
      if (currentNode.data.key == key) {
        return list.deleteAt(deletedIndex);
      }
      currentNode = currentNode.next;
      deletedIndex++;
    }
    return null;
  }
}

export { HashTable };

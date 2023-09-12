import { HashTable } from "../HashTable/HashTable.mjs";

class HashSet {
  constructor() {
    this.hashTable = new HashTable();
  }

  add(data) {
    if (this.hashTable.get(data) == null) {
      // key값 중복방지
      this.hashTable.set(data, -1); // set은 key만 사용한다.
    }
  }

  isContain(data) {
    return this.hashTable.get(data) != null;
  }

  remove(data) {
    this.hashTable.remove(data);
  }

  clear() {
    // 각 인덱스마다 연결된 리스트 초기화
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      this.hashTable.arr[i].clear();
    }
  }

  isEmpty() {
    let empty = true;
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      if (this.hashTable.arr[i].count > 0) {
        empty = false;
        break;
      }
    }

    return empty;
  }

  printAll() {
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      let currentNode = this.hashTable.arr[i].head;
      while (currentNode != null) {
        console.log(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }
  }
}

export { HashSet };

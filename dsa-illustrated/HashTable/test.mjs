import { HashTable } from "./HashTable.mjs";

let hashTable = new HashTable();

hashTable.set(1, "이윤재");
hashTable.set(4, "최진철");
hashTable.set(20, "홍명보");
hashTable.set(6, "유상철");
hashTable.set(22, "송종국");
hashTable.set(21, "박지성");
hashTable.set(5, "김남일");
hashTable.set(10, "이영표");
hashTable.set(8, "최태욱");
hashTable.set(9, "서릭현");
hashTable.set(14, "이현수");

console.log(`1 : : ${hashTable.get(1)}`); // 1 : 이운재
hashTable.remove(1);
console.log(`1 : : ${hashTable.get(1)}`); // null
console.log(`21 : : ${hashTable.get(21)}`); // 21: 박지성

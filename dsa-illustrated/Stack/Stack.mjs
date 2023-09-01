import { LinkedList } from '../LinkedList/LinkedList.mjs';

class Stack{
    constructor(){
        this.list = new LinkedList();
    }

    push(data){
        this.list.insertAt(0, data); // 무조건 첫번째 index에 삽입 
    }

    pop(){
        try{
            return this.list.deleteAt(0); // 무조건 첫번째 index 삭제
        } catch(e){
            return null;
        }
    }

    peek(){
        return this.list.getNodeAt(0);
    }

    isEmpty(){
        return (this.list.count == 0);
    }
}

export { Stack };
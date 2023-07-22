// *****************
// Extend and Super
// *****************
// 하위 클래스 생성 (특히 상속)과 관련 있음 
//	클래스 간에 기능을 공유하는 방법 (서로 공통 메서드를 사용하는 클래스)

class Pet {
	constructor(name, age) {
		console.log('IN PET CONSTRUCTOR!');
		this.name = name;
		this.age = age;
	}
	eat() {
		return `${this.name} is eating!`;
	}
}

class Cat extends Pet {
	constructor(name, age, livesLeft = 9) {
		console.log('IN CAT CONSTRUCTOR!');
		super(name, age); // 확장시킨 클래스의 생성자(constructor)를 참조한다.
		this.livesLeft = livesLeft;
	}
	meow() {
		return 'MEOWWWW!!';
	}
}

class Dog extends Pet {
	// 생성자를 따로 정의하지않으면 자동으로 확장 클래스의 생성자를 참조 
	bark() {
		return 'WOOOF!!';
	}
	eat() {
		return `${this.name} scarfs his food!`; // Dog클래스에 eat 매서드가 없을 경우 프로토 타입인 pet의 eat 매서드를 찾는다 
	}
}


const monty = new Cat('monty',9)
// IN CAT CONSTRUCTOR!
// IN PET CONSTRUCTOR! // constructor의 super(name, age);  
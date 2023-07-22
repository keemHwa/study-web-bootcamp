
/*
 ============================================================
  Object prototypes (프로토 타입) 
 ============================================================
  모든 객체들이 메소드와 속성을 상속 받기위한 템플릿으로써 프로토타입 객체를 가진다
 	- 프로토타입 체인(prototype chain)
	: 프로토 타입 객체도 또 다시 상위 프로토타입 객체로부터 메소드와 속성을 상속 받을 수도 있고 그 상위 프로토 타입 객체도 마찬가지이다
	: 다른 객체에 정의된 메소드와 속성을 한 객체에서 사용할 수 있도록 하는 근간
 * 상속되는 속성과 메소드들은 각 객체가 아니라 객체의 생성자의 `prototype`이라는 속성에 정의
	JavaScript에서는 객체 인스턴스와 프로토타입 간에 연결(많은 브라우저들이 생성자의 `prototype` 속성에서 파생된 `__proto__` 속성으로 객체 인스턴스에 구현)
	이 구성되며 이 연결을 따라 프로토타입 체인을 타고 올라가며 속성과 메소드를 탐색한다. (__proto__ (앞뒤로 언더바 2개씩) 속성을 통해 특정 객체의 프로토타입 객체에 접근)
	ex)  const arr = [1,2,3] 의 프로토 타입 객체는 Array 이며 이 Array의 프로토타입 객체는 Obejct 이다
*/

//String.prototype is a "template object" for every single string.
//We could go crazy and add our own method called yell...
String.prototype.yell = function() {
	return `OMG!!! ${this.toUpperCase()}!!!!! AGHGHGHG!`;
};

'bees'.yell(); //"OMG!!! BEES!!!!! AGHGHGHG!"

//We can overwrite an existing Array method like pop (not a good idea):
Array.prototype.pop = function() {
	return 'SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF!';
};
const nums = [ 6, 7, 8, 9 ];
nums.pop(); // "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF!"

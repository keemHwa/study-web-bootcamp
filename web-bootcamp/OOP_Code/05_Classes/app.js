
// 더 좋은 방법(깔끔한 방법)으로 템플릿을 만드는 방법 
class Color { //클래스, 생성자 함수는 대문자로 시작
	constructor(r, g, b, name) { // new 로 인스턴스 생성시 즉시 실행 
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	innerRGB() {
		const { r, g, b } = this; // 클래스 안에 있는 this는 항상 클래스의 인스턴스를 참조한다. (개별 객체)
		return `${r}, ${g}, ${b}`;
	}
	rgb() {
		return `rgb(${this.innerRGB()})`;
	}
	rgba(a = 1.0) {
		return `rgba(${this.innerRGB()}, ${a})`;
	}
	hex() {
		const { r, g, b } = this;
		return (
			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	}
}
const red = new Color(255, 67, 89, 'tomato');
const white = new Color(255, 255, 255, 'white');

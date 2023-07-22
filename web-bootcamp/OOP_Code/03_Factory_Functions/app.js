//This functions makes and returns an object every time it is called.
// The resulting objects all follow the same "recipe"
//A factory function is not commonly used 

function makeColor(r, g, b) {
	const color = {};
	color.r = r;
	color.g = g;
	color.b = b;
	color.rgb = function() {
		const { r, g, b } = this; // 분해
		return `rgb(${r}, ${g}, ${b})`;
	};
	color.hex = function() {
		const { r, g, b } = this;
		return (
			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	};
	return color;
}

const firstColor = makeColor(35, 255, 150);
firstColor.hex(); //firstColor.hex();
firstColor.rgb(); //"rgb(35, 255, 150)"

const black = makeColor(0, 0, 0);
black.rgb(); //"rgb(0, 0, 0)"
black.hex(); //"#0000s00"


// 위와 같은 팩토리 함수 단점 
/** 
 firstColor.hex === black.hex 
 > false
 "test".toUpperCase === "teee".toUpperCase
 > true 
  
 === (참조하는 것도 같은지 봄)
 매번 객체를 생성 할 때마다 같은 기능을 하는 메서드지만 별도로 메서드를 만든다  
 "test"와 "teee"의 toUpperCase는 둘다 프로토 타입인 String의 toUpperCase를 참조하고 있음  
*/

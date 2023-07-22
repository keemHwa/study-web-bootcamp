// This is a Constructor Function...
function Color(r, g, b) {
	// 대문자로 시작하는 경우, 일반 함수가 아니고 객체를 만들게 해주는 함수라는 뜻  
	this.r = r;
	this.g = g;
	this.b = b;
	console.log(this);
}

//If you call it on its own like a regular function...
Color(35, 60, 190); //It returns undefined. Seems useless!
	// > Window {window: Window, self: Window, ..}	
	// > undefined
// 위 경우 this 다른 객체 안에 있는게 아니라 전체 범위를 참조하면서 가장 가까운 window 객체를 참조한다
 

// *****************
// THE NEW OPERATOR!
// *****************

// 1. Creates a blank, plain JavaScript object;
// 2. Links (sets the constructor of) this object to another object;
//	ex) constructor: ƒ Color(r, g, b)
// 3. Passes the newly created object from Step 1 as the this context;
// 4. Returns this if the function doesn't return its own object.

// new Color(35, 60, 190); // 객체 반환 

Color.prototype.rgb = function() { // 화살표 함수에서는 this가 다르게 동작한다 (주의!)
	const { r, g, b } = this;
	return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function() {
	const { r, g, b } = this;
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function(a = 1.0) {
	const { r, g, b } = this;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const color1 = new Color(40, 255, 60);
color1.hex();
const color2 = new Color(0, 0, 0);
color2.hex();

// color1.hex === color2.hex //true 공통의 프로토타입
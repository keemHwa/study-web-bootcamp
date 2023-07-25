const add = (x, y) => x + y
const PI = 3.14159;
const square = x => x * x;

// 내보내려는 항목을 moudle.export에 포함시켜야 함 
module.exports.add = add; // module.exports라는 객체에 add 함수 지정 
module.exports.PI = PI;  
module.exports.square = square;

//==============================================================
//exports.PI = PI로도 사용할 수 있지만 

//export = "wekjfldkjsnfljke" 
//exports.PI = PI 
// 위와 같이 작성했을 경우 더이상 module.export에 추가하지 않게 됨
// 문자열로 지정 되었고, 그냥 변수여서 임의로 변경 가능한 상태가 되었기 때문에 
//==============================================================

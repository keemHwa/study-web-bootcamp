const cats = require('./shelter') // 해당 디렉토리의 메인 파일 인 ./shelter/index.js 가 내보내는 항목을 가지고 오게된다. 
const cowsay = require("cowsay");
console.log (cats);
console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

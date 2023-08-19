const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('thisIsMySecret')); // 모든 요청에 실행(쿠키파서 미들웨어) // 파서 안에 있는 문자열이 쿠키 파서가 쿠키에 사인할 때 사용된다. 
    // 비밀키를 변경 할 경우, 해당 비밀키로 서명 되었던 모든 쿠키가 무효화 된다. 


app.get('/', (req, res) => {
    console.log(req.cookies); // 요청시 sendName에서 저장한 쿠키 정보를 파싱
    const { name = 'unname' } = req.cookies;
    res.send(`방문을 환영합니다. ${name}`);
})

app.get('/sendName', (req, res) => {
    res.cookie('name', '백억이') // 쿠키 전송
    res.cookie('animal', '강아지') // 쿠키 전송
    res.send('쿠키전달완')
})

app.get('/getSignedCookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true }); 
    res.send('사인 쿠키')
})

app.get('/verifyFruit', (req, res) => {
    console.log(req.cookies); //{"animal": "강아지", "name": "백억이"} 
    console.log(req.signedCookies); //{"fruit": "grape"}
        // 서명된 쿠키와 일반적인 무서명 쿠키를 구분하기위해 
    res.send(req.signedCookies);  
    // 개발자 도구로 쿠키 값을 강제로 수정했을 경우 req.signedCookies 출력시 {} 빈값이 나온다.
})

app.listen(3000, () => {
    console.log("연결");
})
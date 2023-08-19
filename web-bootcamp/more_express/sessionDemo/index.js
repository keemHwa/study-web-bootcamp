const express = require('express');
const app = express();
const session = require('express-session');

const sessionOption = { 'secret': '테스트용', resave: false, saveUninitialized: false };
app.use(session(sessionOption)); // 다시 보내는 쿠키에 서명
// connect.sid(sessionId) => express session cookie name 

app.get('/viewCount', (req, res) => {
    if (req.session.count) { // req.session에 원하는건 모두 추가 할 수 있다.
        req.session.count += 1;  
    } else {
        req.session.count = 1;
    }
    res.send(`${req.session.count}번째 접속`); // express-session은 쿠키 변조를 확인 후 세션 저장소를 살펴서 ID의 정보를 찾아서 접근한다.

    // 세션의 데이터는 서버 측에 저장되고 개인 사용자 혹은 개별 브라우저와 연결(쿠키를 통해, 하지만 쿠키는 세션내의 어떠한 정보도 포함 되지 않는다. )
        // it only saves the session ID in the cookie itself, not session data
        // By default, it uses in-memory storage and is not designed for a production environment. 
    // 서버를 재시작할 때마다 코드를 변경하거나 정지하고 시작할 때 메모리 저장소를 사용하는 것
        // 모든 세션 데이터가 로컬 메모리의 서버 측에 저장되기 때문에 모두 리셋
})
app.listen(3000, () => {
    console.log("연결");
})
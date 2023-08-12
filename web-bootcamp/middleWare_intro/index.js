const express = require('express');
const app = express();

const morgan = require('morgan');

// app.use(() => {
//     console.log("안녕") // app.use는 모든 요청에 동작
// })

app.use(morgan('tiny')); // 모든 요청 (get,post 등등) 에 morgan이 동작하도록

// app.use((req, res, next) => {
//     res.send('HOME PAGE!')
//     next(); // 동작하지 않는다. 요청 한개당 한 응답만 가능하기에. 이미 윗줄에서 응답이 끝남 
// })

app.use((req, res, next) => {
    console.log("내 첫 미들웨어!"); //순서대로 동작
    next(); // 다음 미들웨어 또는 라우터 핸들러가 실행된다.
    console.log("내 첫 미들웨어! - next 호출 이후!"); // 동작한다.

})

app.use((req, res, next) => {
    console.log("내 두번째 미들웨어!");
    next();  //이다음이 라우터 핸들러일경우 next()가 없으면 라우터 핸들러가 실행되지 않는다.
})


app.get('/', (req, res) => {
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})
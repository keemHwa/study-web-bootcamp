const express = require('express');
const app = express();

const morgan = require('morgan');

// app.use(() => {
//     console.log("안녕") // app.use는 모든 요청에 동작, 순서대로 동작한다.
// })

app.use(morgan('tiny')); // 모든 요청 (get,post 등등) 에 morgan이 동작하도록

// app.use((req, res, next) => {
//     res.send('HOME PAGE!')
//     next(); // 동작하지 않는다. 요청 한개당 한 응답만 가능하기에. 이미 윗줄에서 응답이 끝남
// })

// app.use((req, res, next) => {
//     console.log("내 첫 미들웨어!"); 
//     next(); // 다음 미들웨어 또는 라우터 핸들러가 실행된다.
//     console.log("내 첫 미들웨어! - next 호출 이후!"); // 동작한다.

// })

// app.use((req, res, next) => {
//     console.log("내 두번째 미들웨어!");
//     next();  //이 다음이 라우터 핸들러일경우 next()가 없으면 라우터 핸들러가 실행되지 않는다.
// })

app.use((req, res, next) => {
    req.requestTime = Date.now(); //모든 라우트 핸들러에서 req.resquestTime에 접근 가능. (먼저 실행됐기 때문 )
    // //  decorating : 요청 객체에 다음으로 매칭될 라우트 핸들러에서 사용할 정보를 추가하는 것
    next();
})

app.use('/dogs', (req, res, next) => { //문자열 혹은 경로도 전달 가능
    console.log("I LOVE DOGS!!")
    next();
})

const verifyPassword = (req, res, next) => { // 비밀번호 설정 데모 
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send("YOU NEED A PASSWORD!")
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => { // 특정 라우트에만 특정 미들웨어가 실행되도록 미들웨어 전달
	// /secret 호출 시 verifyPassword가 먼저 실행되어 next를 전달하면 뒤 콜백 실행
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.use((req, res, next) => { //404 아무것도 매칭되지 않을 때 (맨 마지막에 와야함)
    res.status(404).send('NOT FOUND!')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})


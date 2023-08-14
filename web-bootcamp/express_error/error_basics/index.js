const express = require('express');
const app = express();

const appError = require('./appError');
const morgan = require('morgan');

app.use(morgan('tiny')); // 모든 요청 (get,post 등등) 에 morgan이 동작하도록

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
    //res.send("YOU NEED A PASSWORD!")
    //res.status(401); // 권한 없음 
    throw new appError(401,'비밀번호를 입력하세요');
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!')
})
app.get('/error', (req, res) => {
    //res.send('WOOF WOOF!')
    ohmygod.error();
})

app.get('/secret', verifyPassword, (req, res) => { // 특정 라우트에만 특정 미들웨어가 실행되도록 미들웨어 전달
	// /secret 호출 시 verifyPassword가 먼저 실행되어 next를 전달하면 뒤 콜백 실행
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/admin', (req, res) => {
    throw new appError(403, '관리자가 아닙니다.')
})

app.use((req, res, next) => { //404 아무것도 매칭되지 않을 때 (맨 마지막에 와야함)
    res.status(404).send('NOT FOUND!')
})

// 오류 처리 미들웨어 (4개의 인자가 필요)
// app.use((err, req, res, next) => { // 오류가 발생할 경우 해당 오류 처리 미들웨어가 실행된다.
//     console.error("**************************************************************************")
//     console.error("**************************ERROR ! ! **************************************")
//     console.error("**************************************************************************")
//     //res.status(500).send('Something broke!')
//     next(err); // 디폴트 오류 처리 미들웨어를 쓰고 싶으면 next에 인자를 넣어 실행 해야한다.
//         // next에 무언가를 전달하면 Express는 현재 요청을 오류로 간주하고 남아있는 오류 처리 이외의 라우팅과 미들웨어 함수를 건너뛴다.
//   })

app.use((err, req, res, next) => { 
    // const { status } = err;
    //res.status(status).send(" 에 러 ")
    const { status = 500, message = '에러' } = err;  // 상태코드와 메세지가 없을 경우 값의 상태 코드와 메세지가 출력 (자바스크립트 default ERROR 클래스에는 status가 없다.)
                                                    // 메세지 역시 자바스크립의 메세지가 있을 때에는 자바스크립트 메세지가 뜬다. (일반적인 오류일경우 상태코드가 없다.)
    res.status(status).send(message);
})
app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})


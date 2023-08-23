if (process.env.NODE_DEV !== "production") {
    require('dotenv').config(); // 이름이 .env 파일을 최상이 디렉토리에서 찾는다.
}

console.log(process.env.SECRET); // 파싱 후 process.env에 전부 넣는다. 

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const expressError = require('./utils/expressError');
const catchAsync = require('./utils/catchAsync');
const campGround = require('./models/campGround');
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const userRoutes = require('./routes/users');
const campGroundRoutes = require('./routes/campGrounds');


const { isLoggedIn,storeReturnTo,isAuthor,validateCampGround } = require('./middleware'); // [Function (anonymous)]
// const isLoggedIn = require('./middleware'); // { isLoggedIn: [Function (anonymous)] }

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yapCamp');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
    })


const app = express();

app.engine('ejs', ejsMate); // ejs 파일을 실행하거나 파싱할 때 쓰이는 Express default engine 대신 이걸 사용하라고 지정 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); 
// * express가 request body를 분석할 방법을 명시해야한다.  
//To parse form data(=payload) in POST request body :
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')) // npm i method-override 설치 후 사용, 쿼리문자열에서 method를 가져온다. form에서 get, post이외 사용가능한다.
    // 여기선 _method라고 지정했기에 쿼리문자열 _method 값을 가져온다. 

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // javascript session cookie 접근 제한 (document.cookie)
        // secure:true, //https 통해서만 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session()); // express에서 사용할 시 express-session이 있어야한다.

passport.use(new LocalStrategy(User.authenticate()));
    // passport가 LocalStrategy(사용자 이름-비밀 매커니즘 전략)를 사용하도록 하며 인증 메서드(authenticate) 추가.
    // User.authenticate() Generates a function that is used in Passport's LocalStrategy

// To maintain a login session, Passport serializes and deserializes user information to and from the session
passport.serializeUser(User.serializeUser()); 
    // 사용자가 로그인하면, serializeUser 함수는 사용자의 고유한 식별자 (예: 사용자 ID)를 세션에 저장
passport.deserializeUser(User.deserializeUser()); 
    // 세션이 유지되는 동안, 모든 요청에서 deserializeUser 함수는 세션에 저장된 사용자 식별자를 기반으로 사용자 정보를 검색
    // 이 함수는 사용자 데이터베이스 또는 다른 저장소를 쿼리하여 해당 사용자의 전체 정보를 가져온다(세션유지용)

app.use((req, res, next) => {
    // res.locals 
    // Express.js의 res.locals 로 요청 - 응답 사이클에서 데이터를 애플리케이션에 전달할 수 있는 오브젝트
    // 이 오브젝트로 저장한 변수는 템플릿 및 다른 미들웨어 함수가 액세스할 수 있다. 
    res.locals.currentUser = req.user; //  Passport에 의해 세션의 직렬화된 사용자 정보를 Passport가 역직렬화해서 req.user에 해당 데이터를 담는다.
    next();
   
})
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', userRoutes);
app.use('/campGrounds', campGroundRoutes);

// app.get('/makeCampGround', async (req, res) => {
//     const camp = new campGround({ title:'밤별생각 낮달이야기 캠핑장', description:'행복한 쉼터 밤별생각낮달이야기', price :'75000'})
//     await camp.save();
//     res.send(camp)
// })



app.all('*', (req, res, next) => { // 위 라우터들 중 일치하는 요청이 없을 경우 동작
    next(new expressError(404, '페이지를 찾을 수 없습니다.'));
})

app.use((err, req, res, next) => {
    // const { statusCode = 500, message = "오류가 발생했습니다." } = err; // 분해 후 메세지를 지정해주는거라서 객체에 update 되지 않음  
    const { statusCode = 500 } = err;
    if(!err.message) err.message = '오류가 발생했습니다. '
    res.status(statusCode).render('error', { err });
    
})
app.listen(3000, () => {
    console.log("완!");
});

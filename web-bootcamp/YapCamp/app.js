const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campGroundSchema } = require('./validateSchema'); // module.exports.campGroundSchema = ~ 
const methodOverride = require('method-override');
const expressError = require('./utils/expressError');
const catchAsync = require('./utils/catchAsync');
const campGround = require('./models/campGround');
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const { isLoggedIn } = require('./middleware'); // [Function (anonymous)]
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
        httpOnly: true,
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

const validateCampGround = (req, res, next) => {
    const { error } = campGroundSchema.validate(req.body);
    console.dir(error);
    if (error) {
        const message = error.details.map(el => el.message).join(',') //Map은 콜백 함수를 수령해서 배열의 요소당 1번씩 실행하여 새로운 배열 생성 
        throw new expressError(400, message);
    } else {
        next() // 다음 미들웨어나 핸들러 실행 
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/fakeUser', async (req, res) => {
    try {
        const user = new User({ email: 'test1@gmail.com', username: 'test1' });
        const newUser = await User.register(user, 'passwordtest'); //  User.register은 전체 사용자 모델 인스턴스와 암호를 취하고 암호를 솔트,해시(Pbkdf2)하고 저장한다.
        res.send(newUser);
    } catch (e) {
        res.send(e.message); // passport-local-mongoose > register username 중복 체크 O
    }
})

app.get('/login', (req, res) => {
    res.render('./user/login')
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), (req, res) => {  // passport에서 제공하는 local 전략 미들웨어사용
    res.redirect('/campGrounds')
})

app.get('/logout', (req, res) => {
    req.logOut(function (err) { //passport 메서드 
        if (err) {
            return next(err);
        }
        res.redirect('/campgrounds');
    });
})


app.get('/campGrounds', async (req, res) => {
    const campGrounds = await campGround.find({});
    res.render('campGrounds/index', { campGrounds })
})

app.get('/campGrounds/new', isLoggedIn, (req, res) => { // isLoggedIn 미들웨어를 통한 로그인 여부 확인 추가 
    res.render('campGrounds/new')  // 제너릭 패턴 생성 관련 순서 주의! 아래의 :/id 라우터 다음에 있으면 new를 id로 인식한다.
})

app.post('/campGrounds', validateCampGround,catchAsync(async (req, res, next) => {
    //if(!req.body.campGround) throw new expressError(400,'유효하지않은 요청입니다.')
    
    //res.send(req.body); // 파싱을 해주지 않으면 req.body가 비어있다.
    const newCampGound = new campGround(req.body.campGround);
    await newCampGound.save();
    res.redirect(`/campGrounds/${newCampGound._id}`)
}))


app.get('/campGrounds/:id', catchAsync(async (req, res, next) => {
    const campGroundDetail = await campGround.findById(req.params.id);
    res.render('campGrounds/show', { campGroundDetail })
}))

app.get('/campGrounds/:id/edit', catchAsync(async (req, res, next) => {
    const campGroundDetail = await campGround.findById(req.params.id);
    res.render('campGrounds/edit', { campGroundDetail }) 
}))


app.get('/makeCampGround', async (req, res) => {
    const camp = new campGround({ title:'밤별생각 낮달이야기 캠핑장', description:'행복한 쉼터 밤별생각낮달이야기', price :'75000'})
    await camp.save();
    res.send(camp)
})

app.put('/campGrounds/:id', validateCampGround, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await campGround.findByIdAndUpdate(id, { ...req.body.campGround }); // 분해하여 전달 
    res.redirect(`/campGrounds/${campground._id}`)
}))

app.delete('/campGrounds/:id', catchAsync(async (req, res,next) => { // 삭제는 post로 해도 된다.
    const { id } = req.params.id;
    // console.log(req.params.id); 왜 구조 분해를 해야하는지는 모르겠지만 ..
    // await campGround.findByIdAndDelete(req.params.id); 동작 
    await campGround.findByIdAndDelete(id);
    res.redirect('/campGrounds')
}))


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

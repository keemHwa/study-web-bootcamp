const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());

const Farm = require('./models/farm')



main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/flashDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// FARM ROUTES

app.use((req, res, next) => { // 모든 요청에 대한 응답에 변수를 설정=> messages의 키 값을 렌더링하는 모든 페이지에서 접근
    res.locals.messages = req.flash('success'); // 개선된 방법으로 플래시 메세지 전달 
    // res.locals
    // 이 속성을 사용하여 res.render로 렌더링된 템플릿에서 액세스할 수 있는 변수를 설정할 수 있다.
    // res.locals에 설정된 변수는 단일 요청 - 응답 주기 내에서만 사용할 수 있으며 요청 간에 공유되지 않는다..
    next();
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');
        // 이렇게만 추가해서 당장 메세지가 보이는 것은 아니고, 세션에 정보를 추가하는 작업이다.
        // res.redirect('/farms', { messages: req.flash('sucess') }); 렌더링할 때 같이 전달해야 
        // 새로고침하면 사라진다
    res.redirect('/farms')
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})




const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');

main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authDemo');
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notaGoodSecert' }));

const requireLogin = (req, res, next) => {
    if (!req.session.user_Id) {
        return res.redirect('/login');
    }
    next();
}
app.get('/', (req, res) => {
    res.send('메인 홈')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password); 
    if (foundUser) {
        req.session.user_Id = foundUser._id; // 로그인 성공 시 사용자 ID 세션에 저장 
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    //const hash = await bcrypt.hash(password, 10);
    const newUSer = new User({ username, password: password });
    await newUSer.save();
    req.session.user_Id = newUSer._id; // 가입 후 사용자 ID 세션에 저장 
    res.redirect('/')
})


app.post('/logout', (req, res) => {
    req.session.user_Id = null;
    // res.session.destory(); // 해당 세션 정보 전체를 파기하는 법 
    res.redirect('/login');
})
app.get('/secret', requireLogin,(req, res) => {
    res.render('secret')
})

app.get('/topSecret', requireLogin,(req, res) => {
    res.send('topSecret')
})

app.listen(3000, () => { 
    console.log('연결')
})
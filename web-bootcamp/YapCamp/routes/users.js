const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const users = require('../controllers/users');

const { storeReturnTo } = require('../middleware'); // [Function (anonymous)]
 

router.get('/fakeUser', async (req, res,next) => {
    try {
        const user = new User({ email: 'test3@gmail.com', username: 'test3' });
        const newUser = await User.register(user, '1234'); //  User.register은 전체 사용자 모델 인스턴스와 암호를 취하고 암호를 솔트,해시(Pbkdf2)하고 저장한다.
        req.logIn(newUser, err => { // 회원가입후 로그인 상태 유지
            if (err) return next(err); 
            res.redirect('/campGrounds');
        }); 
       
    } catch (e) {
        res.send(e.message); // passport-local-mongoose > register username 중복 체크 O
    }
})

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo,     // use the storeReturnTo middleware to save the returnTo value from session to res.locals
        passport.authenticate('local', { failureRedirect: '/login' }),
        users.login);

router.get('/logout', users.logout);


module.exports = router;
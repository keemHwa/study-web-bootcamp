
module.exports.isLoggedIn = (req, res, next) => {
    // store the url they are requesting -> after login post, redirect that url 
    // console.log(req.path, req.originalUrl); // req.path : 라우트 // req.originalUrl : 원래 경로 
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) // 로그인 세션 정보확인 
        return res.redirect('/login')
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
        console.log(`아바바바 : ${res.locals.returnTo}`);
    }
    next();
}
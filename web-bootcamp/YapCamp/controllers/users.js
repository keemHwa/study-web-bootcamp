
module.exports.renderLogin = (req, res) => {
    res.render('./user/login')
}

module.exports.login = (req, res) => {  // passport에서 제공하는 local 전략 미들웨어사용
    const redirectUrl = res.locals.returnTo || '/campGrounds';
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res) => {
    req.logOut(function (err) { //passport 메서드 
        if (err) {
            return next(err);
        }
        res.redirect('/campgrounds');
    });
};
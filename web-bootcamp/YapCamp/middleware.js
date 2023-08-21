
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) // 로그인 세션 정보확인 
    return res.redirect('/campGrounds')
    next();
}
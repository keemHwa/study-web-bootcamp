
const { campGroundSchema } = require('./validateSchema'); // module.exports.campGroundSchema = ~ 
const campGround = require('./models/campGround');
const expressError = require('./utils/expressError');



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
    }
    next();
}

module.exports.validateCampGround = (req, res, next) => {
    //console.log('validateCampGround'); 
    //console.dir(req.body); 
    const { error } = campGroundSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',') //Map은 콜백 함수를 수령해서 배열의 요소당 1번씩 실행하여 새로운 배열 생성 
        throw new expressError(400, message);
    } else {
        next() // 다음 미들웨어나 핸들러 실행 
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await campGround.findById(id); //  
    if (!campground.author._id.equals(req.user._id)) {
        //req.flash('err', '잘못된 접근입니다.');
        return res.redirect(`/campGrounds`)
    }
    next();
}
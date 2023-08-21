
const campGround = require('../models/campGround');

module.exports.index = async (req, res) => {
    const campGrounds = await campGround.find({});
    res.render('campGrounds/index', { campGrounds })
}

module.exports.rendNewForm = (req, res) => { // isLoggedIn 미들웨어를 통한 로그인 여부 확인 추가 
    res.render('campGrounds/new')  // 제너릭 패턴 생성 관련 순서 주의! 아래의 :/id 라우터 다음에 있으면 new를 id로 인식한다.
}

module.exports.createCampground = async (req, res, next) => {

    //if(!req.body.campGround) throw new expressError(400,'유효하지않은 요청입니다.')
    //res.send(req.body); // 파싱을 해주지 않으면 req.body가 비어있다.
    const newCampGound = new campGround(req.body.campGround);
    newCampGound.author = req.user._id;
    newCampGound.image = req.files.map(files => ({ url: files.path, filename: files.filename })); // 객체 배열을 포함하는 새로운 배열 
    console.log(newCampGound);
    await newCampGound.save();
    res.redirect(`/campGrounds/${newCampGound._id}`)
}

module.exports.showCampground = async (req, res, next) => {
    const campGroundDetail = await campGround.findById(req.params.id).populate('author');
    if (!campGroundDetail) {
        //req.flash('err', '캠핑장을 찾을 수 없습니다.');
        return res.redirect(`/campGrounds`)
    }
    res.render('campGrounds/show', { campGroundDetail })
}

module.exports.rendEditForm = async (req, res, next) => {
    const { id } = req.params;
    const campground = await campGround.findById(id); //  
    if (!campground) {
        //req.flash('err', '캠핑장을 찾을 수 없습니다.');
        return res.redirect(`/campGrounds`)
    }
    const campGroundDetail = await campGround.findById(id);
    res.render('campGrounds/edit', { campGroundDetail }) 
}


module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await campGround.findById(id); //  
    if (!campground.author._id.equals(req.user._id)) {
        //req.flash('err', '잘못된 접근입니다.');
        return res.redirect(`/campGrounds/${id}`)
    }
    const camp = await campGround.findByIdAndUpdate(id, { ...req.body.campGround }); // 분해하여 전달 
    res.redirect(`/campGrounds/${camp._id}`)
}

module.exports.deleteCampground = async (req, res,next) => { // 삭제는 post로 해도 된다.
    const { id } = req.params;
    // console.log(req.params.id); 왜 구조 분해를 해야하는지는 모르겠지만 ..
    // await campGround.findByIdAndDelete(req.params.id); 동작 
    const campground = await campGround.findById(id); //  
    if (!campground.author._id.equals(req.user._id)) {
        req.flash('err', '잘못된 접근입니다.');
        return res.redirect(`/campGrounds/${id}`)
    }
    await campGround.findByIdAndDelete(id);
    res.redirect('/campGrounds')
}
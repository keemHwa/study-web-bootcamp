const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer  = require('multer')  // Express.js multipart/form-data parsing middleware
const { storage } = require('../cloudinary'); // ../cloudinary/index -> index까지는 적지 않아도 O, 폴더에서 자동으로 찾는다.
const upload = multer({ storage }) // 업로드 목적지 
const campGround = require('../models/campGround');
const campground = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,storeReturnTo,isAuthor,validateCampGround } = require('../middleware'); // [Function (anonymous)]


router.route('/')
    .get(campground.index) // 같은 경로의 라우트지만 다른 행위를 하는 경우 
    .post(isLoggedIn, upload.array('image'), validateCampGround, catchAsync(campground.createCampground));
    // multer는 업로드하면서 파싱한다. 그런 다음 파싱된 body, files등 req.body에서 접근 할 수 있는 모든 것을 전송한다.
        // 그래서 실제 upload.array 전에  validateCampGround을 하면 req.body가 파싱전이라 빈값으로 출력된다. 
         



router.get('/new', isLoggedIn, campground.rendNewForm);

router.route('/:id')
    .get(catchAsync(campground.showCampground))
    .put(isLoggedIn, isAuthor, validateCampGround, catchAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.rendEditForm))

 
module.exports = router;
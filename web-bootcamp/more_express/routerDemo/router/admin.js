const express = require('express');
const router = express.Router(); 


router.use((req, res, next) => { // 특정 라우터에만 미들웨어 적용 가능

    if (req.query.isAdmin) {
        return next();
        // next ();
            // Cannot set headers after they are sent to the client at new NodeError
            // 하나의 요청에 하나 이상의 응답이 가서 그런듯, return 추가 없이 돌렸을 때 console.log("test") 가 출력 됨 
    }
    // console.log("test");
    return res.send('접근 X ');
})
router.get('/topSecret', (req, res) => {
    res.send('topSecret');
})
router.get('/deleteEveryThing', (req, res) => {
    res.send('deleteEveryThing');
})

module.exports = router;
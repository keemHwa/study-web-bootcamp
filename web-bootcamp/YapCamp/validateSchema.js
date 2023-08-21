
const joi = require('joi')

module.exports.campGroundSchema = joi.object({ // 자바스크립트 유효성 검사 도구인 joi를 이용한 서버측 유효성 검사 
    campGround: joi.object({
        title: joi.string().required(),
        price: joi.number().min(0).required(),
        // image: joi.string().required(), image는 req.files로 오기때문에 여기선 검사 할 수 없다. 
        location: joi.string().required(),
        description: joi.string().required()
    }).required() // object => type , requried => 필수 
})

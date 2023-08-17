const mongoose = require('mongoose');
const { Schema } = mongoose; 

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, '농장 이름을 입력 해주세요']
    },
    city: {
        type:String
    },
    contact:{
        type: String,
        required: [true, '연락처를 입력해주세요.']        
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

    // 1. 해당 모델 컴파일 전에 스키마에 설정 해놔야 하는 작업임
    // 쿼리 미들웨어 일 경우 찾아낸 쿼리가 완료 되어 문서에 접근 할 수 있도록 일단 기다려야함 
    

    // 모델 함수인 findByIdAndDelete 실행시 쿼리 함수 findOneAndRemove 실행 
    //   => 즉 findOneAndRemove 미들웨어를 설정하면 findByIdAndDelete 실행 시에도 호출 가능하다. )
    // 쿼리 미들웨어, 문서 미들웨어 == 둘의 this (쿼리, 문서)가 가르키는 것은 다르다. 
    // 미들웨어지만 next() 대신 promise를 리턴하는 함수(async)를 쓸 수있다. (express와 mongoose 미들웨어는 다르다! )
})  

const Farm = mongoose.model('Farm', farmSchema); // model
module.exports = Farm;

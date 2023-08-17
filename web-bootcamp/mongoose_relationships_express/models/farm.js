const mongoose = require('mongoose');
const Product = require('./product');

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
})  

    // mongosee 미들웨어 설정 시 해당 모델 컴파일 전에 스키마에 설정 
        // 미들웨어지만 next() 대신 promise를 리턴하는 함수(async)를 쓸 수있다. (express와 mongoose 미들웨어는 다르다! )
farmSchema.post('findOneAndDelete', async function (farm) {
        // 쿼리 미들웨어일 경우 찾아낸 쿼리가 완료 되어야 문서(data)에 접근 할 수 있다.
        // => pre + 쿼리일 경우 해당 data에 접근 X 
    
        // 모델 함수인 findByIdAndDelete 실행시 쿼리 함수 findOneAndDelete 실행 
        // => 즉 findOneAndDelete 미들웨어를 설정하면 findOneAndDelete 실행 시에도 호출 가능하다. )

    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } });
        // mongo in 연산자가 farm의 products 배열에 들어있는 모든 product를 삭제 처리해준다.
        console.log(res);
    }

})

    // 쿼리 미들웨어, 문서 미들웨어 == 둘의 this (쿼리, 문서)가 가르키는 것은 다르다. 

const Farm = mongoose.model('Farm', farmSchema); // model
module.exports = Farm;

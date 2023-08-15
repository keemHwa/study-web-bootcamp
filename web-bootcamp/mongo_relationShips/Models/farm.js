
const mongoose = require('mongoose');
const { Schema } = mongoose; // 자주 쓰는 것은 별도 변수로 뽑아내기 

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationShipsDemo');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
    })


const productSchema = new Schema({
    name: String,
    price: String,
    seanson: {
        type: String,
        enum: ['봄','여름','가을','겨울']
    }
})

const farmSchema = new Schema({ 
    name: String, 
    city: String,
    product: [{
        type: Schema.Types.ObjectId, //  String 같은 native javasript type이 아니라 mongoose에서 온 객체ID 타입을 사용을 명시
        ref : 'product' // 참조 모델 
    }]  // populate https://mongoosejs.com/docs/populate.html 참조
})

const product = mongoose.model('product', productSchema); // 주의 new X
const farm = mongoose.model('farm', farmSchema); //

// product.insertMany([
//     { name: '사과', price: '5000', seanson: '가을' },
//     { name: '복숭아', price: '6000', seanson: '여름' },
//     { name: '귤', price: '9000', seanson: '겨울' }
// ]);

const makeFarm = async () => {
    const farmdata = new farm({ name: '조치원 부자농원', city: '세종 조치원' });
    const peach = await product.findOne({ name: '복숭아' });
    farmdata.product.push(peach);
    await farmdata.save();
    console.log(farmdata);
}

// makeFarm();
/**
 * {
        name: '조치원 부자농원',
        city: '세종 조치원',
        product: [
            {
            name: '복숭아',
            price: '6000',
            seanson: '여름',
            _id: new ObjectId("64db5d049f621c0d1f9db550"),
            __v: 0
            }
        ],
        _id: new ObjectId("64db66711af66333dd977fc9"),
        __v: 0
    }

    => 실제 DB에 저장된 모습 
    [
        {
            _id: ObjectId("64db66711af66333dd977fc9"),
            name: '조치원 부자농원',
            city: '세종 조치원',
            product: [ ObjectId("64db5d049f621c0d1f9db550") ],
            __v: 0
        }
    ]
*/

// 조회 방법 
farm.findOne({ name: '조치원 부자농원' })
    .populate('product') // ref 모델이름이 아니라 해당 항목의 이름  
    .then(farm => console.log(farm));

/**
 * // populate 전 
 * {
    _id: new ObjectId("64db66711af66333dd977fc9"),
    name: '조치원 부자농원',
    city: '세종 조치원',
    product: [ new ObjectId("64db5d049f621c0d1f9db550") ],
    __v: 0
    }

    // populate 후 
    {
        _id: new ObjectId("64db66711af66333dd977fc9"),
        name: '조치원 부자농원',
        city: '세종 조치원',
        product: [
            {
            _id: new ObjectId("64db5d049f621c0d1f9db550"),
            name: '복숭아',
            price: '6000',
            seanson: '여름',
            __v: 0
            }
        ],
        __v: 0
    }
 */
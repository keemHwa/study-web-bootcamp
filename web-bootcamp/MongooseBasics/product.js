const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // 디폴트 설정 
        maxlength: 20
    },
    price: {
        type: Number, // 유효성 체크처럼 보일 수 있지만 숫자를 전달하도록 요구하지는 않는다, 숫자로 바꿀 수 있는 문자열을 요구 .. price:'599' 도 가능 
        required: true,
        min: [0, 'Price must be positive!'] // 커스텀 메세지  price: ValidatorError: Price must be positive!
    },
    onSale: {
        type: Boolean,
        default: false // 기본값
    },
    categoried: [String],  // 문자열 배열 
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }, // 두개의 하위 특성이 있는 객체
    size: {
        type: String,
        enum: ['S', 'M', 'L'] // enum 문자열 값으로 된 배열을 제공한 후에 해당 값이 그 배열 안에 있는지 확인하는 유효성 검사
    }
});


productSchema.methods.greet = function () { // 인스턴스 메서드 ( 중복되는 부분을 줄여서 코드를 재사용 가능하게 하고 모듈화 함)
    //console.log("HELLO ! ! !!  안녕 "); 
    console.log(`Greet ! ${this.name}`);  //  화살표가 아닌 기존의 함수 표현식을 쓰도록 해야 한다. ( 보통 호출 객체를 가르키기에 화살표 함수 내에서 this는 호출한 객체가 아니라 호출한 객체의 상위 -> window객체를 참조한다. )
}

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save(); // save 후 thenable 반환 thenable은 promise 동작해서 다른곳에서 기다릴 수있다. 
    
}

productSchema.methods.addCategory = function (newDog) {
    this.categoried.push(newDog);
    return this.save();
    
}


const Product = mongoose.model('Product', productSchema); 

const findProudct = async () => {
    const foundProudct = await Product.findOne({ name: 'Mountain Bike' }); // 반환하는게 productSchema  
    console.log(foundProudct);
    //foundProudct.greet();
    await foundProudct.toggleOnSale();
    console.log(foundProudct);
    await foundProudct.addCategory('Outdoors');
    console.log(foundProudct);
}

findProudct();

// const bike = new Product({ name: 'Mountain Bike', price: 599 })
// const bike = new Product({ name: 'Mountain Bike', price:'HELL' })// Error: Product validation failed: price: Cast to Number failed for value "HELL" (type string) at path "price"
// const bike = new Product({ price: 599 }) // ERROR ! Error: Product validation failed: name: Path `name` is required.
// const bike = new Product({ name: 'Mountain Bike', price: 599, color : 'red' }) // 스키마에 없는 항목 추가시 무시한다

// const bike = new Product({ name: 'Bike Helemt From Helmet Maker', price: 29.50 }) // Error: Product validation failed: name: Path `name` (`Bike Helemt From Helmet Maker`) is longer than the maximum allowed length (20).
// const bike = new Product({ name: 'Bike Helemt', price: -9.50 }) //  price: ValidatorError: Path `price` (-9.5) is less than minimum allowed value (0).
// const bike = new Product({ name: 'Cycling Jersey', price: 28.50 , categoried:['Cycling', 'Safety'], size:'XS'}) // enum 테스트   size: ValidatorError: `XS` is not a valid enum value for path `size`.

// bike.save()
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NYO ! ERROR ! ");
//         console.log(err);
//     })


// const bike = new Product({ name: 'Tire Pump', price: 19.50, categoried: ['Cycling'] })
/*
Product.findOneAndUpdate({ name: 'Tire Pump' }, {price: -10.99}, {new:true})
    .then(data => {
        console.log("IT WORKED");
        console.log(data);
    })
    .catch(err => {
        console.log("OH NYO ! ERROR ! ");
        console.log(err);
    })

{
  qty: { online: 0, inStore: 0 },
  _id: new ObjectId("64d4de2d55fea4544dbaece2"),
  name: 'Tire Pump',
  price: -10.99, // 음수인데 값이 들어간다 
  onSale: false,
  categoried: [ 'Cycling' ],
  __v: 0
}

    // 작성 시에는 유효성 검사가 자동으로 적용되는데 업데이트 되고 나서는 Mongoose한테 계속 유효성 검사를 적용하라고 이야기해야함 
        // runValidators: true 옵션

*/  


// Product.findOneAndUpdate({ name: 'Tire Pump' }, {price: -10.99}, {new:true, runValidators: true})
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NYO ! ERROR ! ");
//         console.log(err); // price: ValidatorError: Path `price` (-10.99) is less than minimum allowed value (0).
//     })

    

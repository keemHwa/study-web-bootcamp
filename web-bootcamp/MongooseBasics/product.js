const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true // 디폴트 설정 
    },
    price: {
        type: Number, // 유효성 체크처럼 보일 수 있지만 숫자를 전달하도록 요구하지는 않는다, 숫자로 바꿀 수 있는 문자열을 요구 .. price:'599' 도 가능 
        required:true 
    }
})

const Product = mongoose.model('Product', productSchema); 

// const bike = new Product({ name: 'Mountain Bike', price: 599 }) 
// const bike = new Product({ name: 'Mountain Bike', price:'HELL' })// Error: Product validation failed: price: Cast to Number failed for value "HELL" (type string) at path "price"
// const bike = new Product({ price: 599 }) // ERROR ! Error: Product validation failed: name: Path `name` is required.
// const bike = new Product({ name: 'Mountain Bike', price: 599, color : 'red' }) // 스키마에 없는 항목 추가시 무시한다 



bike.save()
    .then(data => {
        console.log("IT WORKED");
        console.log(data);
    })
    .catch(err => {
        console.log("OH NYO ! ERROR ! ");
        console.log(err);
    })

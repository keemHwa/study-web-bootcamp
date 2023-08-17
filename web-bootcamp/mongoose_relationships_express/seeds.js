
// 왜 또 여기서 Db 연결을 해주는지 ...? 
    // 이 파일은 DB에서 새 데이터를 요청할 때마다 단독으로 실행된다. 
    // 순전히 개발을 위해 웹 앱과 별개로 DB 데이터를 심는 것 

const mongoose = require('mongoose');
const Product = require('./models/product'); 

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
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


// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })


const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts) //insertMany 사용시 하나라도 유효성 검사를 통과하지 못하면 아무것도 삽입되지 X 
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
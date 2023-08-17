const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override') // npm i method-overrid 설치 

const Product = require('./models/product');
const Farm = require('./models/farm');
const { rawListeners } = require('process');

main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStandTake2');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// * express가 request body를 분석할 방법을 명시해야한다.  
//To parse form data(=payload) in POST request body :
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method')) // overrid with POST having ?_method= (쿼리문자열에서 가져온다)
    // <form method="POST" action="/comments/<%=comment.id%>?_method=PATCH"> 
        // post 요청이어도 Express는 patch 요청으로 취급한다 
        //  html 폼 자체에서는 put, patch를 지원하지 않기에 method-overrid 패키지를 설치해서 위와 같이 사용하는것 
        
app.set('view engine', 'ejs'); // view 엔진으로 ejs 사용 
app.set('views', path.join(__dirname, 'views')); //  경로


// FARMS ROUTES
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async (req, res) => { // :id 와 new 순서 주의 ! :id 라우터가 먼저오면 new를 :id로 인지하기에 /new 라우터는 동작 X  
    const farm = await Farm.findById({ _id: req.params.id }).populate('products'); // farm 모델에 있는 해당 항목 이름 
    res.render('farms/show', { farm });
}) // 비동기 함수 누락 주의 ! 

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body); 
    await farm.save();
    res.redirect('/farms');
})
/**
 * ===========================
 * 농장에 새 상품을 추가하는 경우
 * =========================== 
    farms/:farm_id/products/:product_id
    꼭 중첩라우팅을 해서 가져올 필욘 없고 form안에 숨겨서 보낼수도 있고, request body를 통해서 보낼 수도있다.
    하지만 관용적으로 위와 같은 방식이 많이 쓰인다.
    당연히 farms/:id/products/:id 와 같은 변수명이 겹쳐서는 안된다.
*/

app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', { categories, id });
})

app.post('/farms/:id/products', async(req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product); // 양방향 저장
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`farms/${id}`);
})


app.delete('/farms/:id', async (req, res) => { // 양방향 저장일 시 삭제
    const { id } = req.params;
    // 수동으로 해당 데이터를 찾아 삭제하는 것보다 미들웨어를 사용하는것이 연결된 데이터가 많을 때 좋다. 
    //await Product.findByIdAndDelete() //
    //await Farm.findByIdAndDelete(id); 
    res.send('delete');
    
})


// PRODUCT ROUTES 
const categories = ['fruit', 'vegetable', 'dairy'];


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category }); // ./products/index.ejs와 같다 
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' }); // ./products/index.ejs와 같다 
    }
    
    // Assignment to constant variable. :: const는 재할당을 허용하지 않는다 
   
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
    
app.get('/products/:id', async (req, res) => {
    const { id } = req.params; 
    const product = await Product.findById({ _id: id });
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params; 
    const product = await Product.findById({ _id: id });
    res.render('products/edit', { product, categories })
})

app.post('/products', async (req, res) => { 
    // console.log(req.body); //post 시 express가 request body를 분석할 방법을 명시해야한다. 
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`)

})

app.put('/products/:id', async (req, res) => {
    // 업데이트 용으로 put, patch 둘다 써도 상관없지만 둘은 다름.. put은 모든 값, patch는 일부분만 수정
    // 다만 html 폼 자체에서는 put, patch를 지원하지 않기에 method-overrid 패키지를 설치해야함
    const { id } = req.params;

    // const product = Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    // res.redirect(`/products/${product._id}`) // 이렇게 되면 위에서 product 값을 받기전에 이 코드가 진행 되기때문에 _id를 가져올 수 없다

    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`) 
})

app.delete('/products/:id', async (req, res) => { 
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => { // app.listen  해당 포트에 요청을 받고 서버가 실행되면 아래 코드 실행
    console.log('3000 포트 연결');
 })
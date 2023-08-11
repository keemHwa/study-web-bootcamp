const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override') // npm i method-overrid 설치 

const Product = require('./models/product.js');
const { traceDeprecation } = require('process');

const categories = ['fruit', 'vegetable', 'dairy'];

main()
    .then(()=> {
        console.log('mongoose connect ! ');
    })
    .catch(err => {
        console.log('mongoose err ! ');
        console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');

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


app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products }) // ./products/index.ejs와 같다 
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
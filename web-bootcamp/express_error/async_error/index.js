const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError');


const Product = require('./models/product');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

function wrapAsync(fn) { // 라우터 작성시 함수가 들어가야 하기에 retrun function ~ 식으로 사용한다.
    return function (req, res, next) { //return function 이 함수는 (req, res, next)를 가지는데 (req, res, next)가 필요한 이유는 fn 함수에 이걸 전달해야 하기 때문
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/products', wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
}))

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

/**
 * ======================================================================================================
 *  비동기 유틸리티 정의하기  
 * =====================================================================================================
 * 
 *  1) 비동기함수 사용시에는 try catch 사용해주어야함 
 *  app.get('/products/:id/edit', async (req, res, next) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new AppError('Product Not Found', 404);
        }
        res.render('products/edit', { product, categories })
    }catch(e){
        next(e);
    }

    2) 모든 비동기 함수, 핸들러를 try catch 하기 번거롭기에 아래와 같은 방식을 사용. 
    wrapAsync 같은 비동기 콜백을 감싸는 함수를 만들어서 다음 오류가 나올 때마다 반속해서  try catch를 쓰지 않도록 하는것 
*/

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/show', { product })
}))

/**
 * ======================================================================================================
 * 직접 오류를 발생시키는 경우가 아니라 유효성 검사, DB에서 오는 오류 등 next를 호출하지 않았는데 잘못되는 경우 
 * =====================================================================================================
*/
// app.get('/products/:id', async (req, res, next) => { // next 함수는 직접 오류를 발생시킬 때 사용한다. 
//     const { id } = req.params;
//     const product = await Product.findById(id)

//     // if (!product) { // 라우트 핸들러와 미들웨어에 의해 발동된 비동기 함수에서 반환된 오류의 경우에는 next로 전달하여 Express가 잡아내서 처리할 수 있게 해야 한다.
//     //     next(new AppError('?????',404));
//     // }
//     // next 함수는 반드시 코드나 함수의 실행을 중단하는게 아니라 다음 미들웨어 등을 호출한다.
//     // proudct 정보가 없는 경우 오류 핸들러 호출 후에도 아래의 코드가 뜨기에 터미널에 'Cannot read properties of null (reading 'name')' 같은 ejs 오류가 뜬다.
//     // 그럴경우 아래와 같이 return으로 끊어줘야함.
    
//     if (!product) { // next 함수는 뭐든지 전달된 값 자체가 있기만 하면 다음 오류핸들러를 발생시킨다.
//         return next(new AppError('?????',404));
//      }
        
//     res.render('products/show', { product })
// })

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/edit', { product, categories })
}))


app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
}))

app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}));

const handleValidationErr = err => {
    console.dir(err);
    //In a real app, we would do a lot more here...
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    //We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err); // 다음 오류 핸들러가 실행되도록 
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



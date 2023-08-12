const mongoose = require('mongoose');
const campGround = require('../models/campGround');
const campGroundInfo = require('./campGroundInfo');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yapCamp');
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


const seedDB = async () => {
    
    await campGround.deleteMany({});
    for (let info of campGroundInfo) {
        const { name, brief, city, major } = info;
        const c = new campGround({ title: name, location:  `${city} ${major}`, description: brief});
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.disconnect().then(() => {
        console.log("end!!");
    });
})
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})


personSchema.virtual('fullName').get(function () {     // 가상 특성에 대한 getter를 정의
    // (이 특성은 데이터베이스 내부에 존재하는 것이 아니고 JavaScript의 Mongoose에서만 가능)
    // 가상 특성에 대한 setter를 만들어서 samplePesron.fullName = ' william test' 입력 시 그 값으로 해당 스키마의 first(william), last(test)같은 특성의 값을 update 해줄 수도 있다. 
    return `${this.first} ${this.last}`
})

const Person = new mongoose.model('Person', personSchema);

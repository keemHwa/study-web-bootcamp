
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


    
const userSchema = new Schema({
    userName: String,
    age: Number
});


const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'user' } // 단일 사용자 이므로 배열 X . ref 에 schema가 들어가는게 아니라 모델명 들어간다.
})

const user = mongoose.model('user', userSchema);
const tweet = mongoose.model('tweet', tweetSchema);

const makeTweet = async () => {
    //const u = new user({ userName: '사용자1', age: '60' });
    const u = await user.findOne({ userName: '사용자1' })
    //const tweet1 = new tweet({ text: '배고프다', likes: '10' });
    const tweet2 = new tweet({ text: '졸리다', likes: '10' });
    //tweet1.user = u; //객체ID를 저장한다.
    tweet2.user = u; //객체ID를 저장한다.
    //u.save();
    //tweet1.save();
    tweet2.save();
}

// makeTweet();

const findTweet = async() => {
    const t = await tweet.find({}).populate('user','userName')
    console.log(t);
}


findTweet();
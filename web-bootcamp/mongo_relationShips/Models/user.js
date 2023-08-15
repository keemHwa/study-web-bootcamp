
const mongoose = require('mongoose');

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


const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [ 
        {  // 주소 스키마
            _id: false, // 아이디 X 
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})



const user = mongoose.model('user', userSchema);

const makeUser = async () => {
    const u = new user({
        first: '해리',
        last : '포터'
    })

    u.address.push({
        street: '123 세서미',
        city: '뉴욕',
        state: '뉴욕',
        country: '미국'
    })
    const res = await u.save()
    console.log(res)
}

const address = async (id) => {
    const u = await user.findById(id);
    u.address.push({
        street: '999 3번 거리',
        city: '뉴욕',
        state: '뉴욕',
        country: '미국'
    })
    const res = await u.save()
    console.log(res);
}

//makeUser();
/** 
 * {
  first: '해리',
  last: '포터',
  _id: new ObjectId("64db561b68985ddb84b1aa41"),
  address: [ // 주소스키마 > 이런식으로 들어간다
                {
                street: '123 세서미',
                city: '뉴욕',
                state: '뉴욕',
                country: '미국',
                _id: new ObjectId("64db561b68985ddb84b1aa42") // 주소에 대한 고유 ID는 아님 
                }
            ]
    }
*/

address('64db56ce9fc5d589a3208dd9');
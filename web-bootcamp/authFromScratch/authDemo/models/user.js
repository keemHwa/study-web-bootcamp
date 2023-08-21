const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '사용자 이름을 입력하세요.'],
        unique:true
    },
    password: {
        type: String,
        required: [true, '비밀번호를 입력하세요.']
    }
})


// 모델과 관련된 로직을 User 모델에 그룹화 해서 코드 길이를 줄인다.
userSchema.statics.findAndValidate = async function (username, password) { // 화살표 함수 X .. (this)
    const foundUser = await this.findOne({ username });     // this = 특정 모델이나 스키마, 여기선 User
    //const userInfoArray = await User.find({ username }); // find return 배열  
    const isValid = await bcrypt.compare(password, foundUser.password); 
    return isValid? foundUser:false;
}// 모델의 특정 인스턴스가 아닌, user클래스에 추가

// 저장 전 패스워드를 해시하는 미들웨어 
userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) return next(); // 비밀번호가 수정 되었을 때 해시하도록 
    this.password = await bcrypt.hash(this.password, 10);
    next(); // 여기서 next는 save
})
module.exports = mongoose.model('User',userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique:true
    }
});

UserSchema.plugin(passportLocalMongoose); // 사용자 이름 추가, 암호 추가, 사용자 이름 중복 체크 등 부가적인 메서드 추가
    // Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

module.exports = mongoose.model('User', UserSchema);
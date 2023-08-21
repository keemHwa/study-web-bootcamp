const bcrypt = require('bcrypt');


// const hashPassword = async (pw) => { // 해시, 솔트 각각 만드는 경우 
//     const salt = await bcrypt.genSalt(12); // 숫자 == 난이도 올릴 수록 해시 계산하는데 걸리는 시간이 증가한다.
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
//     // bcrypt는 compare 메서드를 통해 해시값을 얻고 그 해시 값에서 솔트가 무엇인지 알 수 있다. 솔트 별도 저장 X 
//     // salt $2b$10$/P.vt52Yi2LGuFlY2/12be
//     // hash $2b$10$/P.vt52Yi2LGuFlY2/12be7cH6nC4TbiFoRa0T/0kpp8yu84jSgq.
// }

const hashPassword = async (pw) => { // 해시, 솔트 한꺼번에 
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashedPassword) => {
    const result = await bcrypt.compare(pw, hashedPassword);
    if (result) {
        console.log("O");
        return;
    } 
    console.log("X");
}
//hashPassword('monky');

login('monky', '$2b$12$Iam2E/TRUkhL97Cm0DbvIOWIp7ouRQYp4BMuyzfw5Spgegxf4HmrO');
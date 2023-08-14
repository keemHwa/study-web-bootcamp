class appError extends Error{ // 자바스크립트 디폴트 error 클래스에는 status가 없다. 
    constructor(status, message) {
        super(); // 확장 클래스의 생성자 
        this.status = status;
        this.message = message;
    }
}

module.exports = appError;

// function catchAsync(fc) {
//     return function (req, res, nex) {
//         fn(req, res, next).catch(e => next(e) );
//     }
// }

module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e) );
    }
}

//  화살표 함수는 원래 익명함수로만 사용할 수 있다. 
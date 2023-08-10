const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Mongo의 각기 다른 키 집합을 JavaScript의 다른 타입으로 구조를 짜는 것
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema); // 주로 모델명과 변수명을 일치한다
// 스키마를 이용한 모델 생성 (단수형 + 첫글자는 대문자)
//  -> 그러면 mongoose는 이름을 딴 movies라는 집합을 생성한다. (자동으로 복수형 + 첫글자 소문자로 변환)

// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' }); // amadeus 인스턴스 생성


// 대량 삽입
// insertMany : MongoDB에서 온 원본 결과를 다루거나 유효성 검사를 통과한 문서인 Promise를 반환
// 모델의 단일 인스턴스를 생성하는 경우 save를 호출해서 데이터베이스에 저장해야 한다. 
// 하지만 insertMany를 호출하면 기본적으로 MongoDB에 바로 연결되어 한 번에 많이 입력할 수 있음 

// Movie.insertMany([ 
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     }) 

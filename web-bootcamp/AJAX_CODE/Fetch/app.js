

//===================
// Fetch API
//===================
// 장점: 최신 기능, XHR로 요청을 생성하는 것보다 훨씬 나음
// 단점: json 구문 분석을 별도로 수행해야함  (body: ReadableStream)
// 가장 기본적인 형태의 url 제공시 get요청 자동실행

fetch("https://swapi.dev/api/people/1/") // fetch는 promise를 반환
  .then((res) => {
    console.log("RESOLVED!", res); // body: ReadableStream, HTTP 요청에서 반환된 JSON이 이 프로미스가 처리되기전에 만들어져서 표시되지 않는다. (응답객체의 본문이 자동으로 분석 X )
    return res.json(); //res 응답 객체를 가져오는 fetch 함수 매서드(res.json), promise를 반환.. 아래 코드를 통해 내용 확인  
  })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERROR!", e);
  });

// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("RESOLVED!", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     return fetch("https://swapi.dev/api/people/2/");
//   })
//   .then((res) => {
//     console.log("SECOND REQUEST RESOLVED!!!");
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("ERROR!", e);
//   });

// 비동기 함수를 이용한 리팩토링 
const loadStarWarsPeople = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/1/");
    const data = await res.json();
    console.log(data);
    const res2 = await fetch("https://swapi.dev/api/people/2/");
    const data2 = await res2.json();
    console.log(data2);
  } catch (e) {
    console.log("ERROR!!!", e);
  }
};

loadStarWarsPeople();

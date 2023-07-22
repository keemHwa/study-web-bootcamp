

// ============
// AXIOS
// ============
// javascript에서 기본 제공하는 함수는 아님, fetch를 개선한 별도 라이브러리 

// axios
//   .get("https://swapi.dev/api/people/1/") // 똑같이 promise를 반환 
//   .then((res) => {
//     console.log("RESPONSE: ", res); //json 구문 분석을 할 필요 X 
//   })
//   .catch((e) => {
//     console.log("ERROR! ", e);
//   });

const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(res.data);
  } catch (e) {
    console.log("ERROR", e);
  }
};

getStarWarsPerson(5);
getStarWarsPerson(10);

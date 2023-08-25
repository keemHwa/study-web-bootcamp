import logo from './logo.svg';
import React from 'react';
import MyHeader from './MyHeader';
import Counter from './Counter';
import Container from './Container';
//import './App.css';
 

function App() {
  // prop : 부모 컴포넌트(app)이 자식 컴포넌트(counter)에 값을 전달하는 것 

  const countProps = {
    a: 5,
    b: 4,
    c: 3,
    d: 2,
    //initialValue : 5
  }

  return (
    <Container>
      <div>
        <MyHeader />
        <Counter {...countProps} />  
      </div> 
    </Container>
  )
}


// const style = { //인라인 스타일 적용방법 
//   App :{
//     backgroundColor: "black",
//   },
//   h1: {
//     color:"red",
//   },
//   bold_tex: {
//     color:"green",
//   }
// }

// const number = 5;

// function App() {
//   let name = '오마쾃'; 
//   return (
//      /*  반드시 하나의 최상위 부모를 가져야한다. */
//      /*  jsx에서 클래스 네임을 지정할 때는 class 가 아니라 className을 사용  */
//     <div style={style.App} className="App"> 
//       <MyHeader/>
//         <h1 style={style.h1}>안녕 리액트 {name}</h1>
//       <b style={style.bold_tex}>
//         {number}는 {number % 2 === 0 ? '짝수' : '홀수'}
//       </b>
//     </div>

//     // 하나의 최상위 부모로 묶고 싶지 않을 경우에는 <React.Fragment></React.Fragment> 또는 <></> 묶어주면 된다. (실제 html 요소를 만들어내지 않음)
//     // jsx {}에는 숫자나 문자열만 가능하다. 
//   );
// }

// module.exports common JS 모듈 방식 
export default App; //(es모듈, 하나만 내보낼수있다. )
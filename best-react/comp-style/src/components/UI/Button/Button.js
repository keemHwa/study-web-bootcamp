import React from "react";
// import styled from "styled-components"; // css-in-js

import styles from "./Button.module.css"; // css module
// import "./Button.css";

// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `; // ``는 자바스크립트 구문 (styled 의 button메서드로 백틱사이에 전달한 스타일을 적용한 버튼을 반환 한다 )

const Button = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {/* css module > 그 클래스 이름을 기본적으로 고유하게 바꾼다 
        -> import하는 css 파일을 고유하게 만들어 다른 css 파일과 겹치지않게 한다. 
        -> css 파일에서 설정한 css 스타일의 범위가 이 파일을 임포트하는 컴포넌트에 한정되는걸 확실히 한다.*/}
      {props.children}
    </button>
  );
};

export default Button;

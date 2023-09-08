import React, { useState } from "react";

import Button from "../../UI/Button/Button";
// import styled from "styled-components";
import styles from "./CourseInput.module.css";

// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color : ${(props) => (props.invalid ? "red" : "black")}

//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     background : ${(props) => (props.invalid ? "#ffd7d7" : "transparent")}
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }

//   &.invalid input {
//     border-color: red;
//     background: #ffd7d7;
//   }

//   &.invalid label {
//     color: red;
//   }
// `; // 전역 , 컴포넌트이기에 대문자로 생성
// styled 컴포넌트에서 설정한 props에 기반해서 스타일의 일부를
// 동적으로 바꾸는 기능을 사용

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* <FormControl invalid={!isValid}> */}
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        {/* 중간대시가 있는 key는 ['']로도 접근가능 */}
        {/* <div className={`form-control ${!isValid ? "invalid" : ""}`}> * /* 동적으로 클래스를 추가하는 방법  */}
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
        {/* </FormControl> */}
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

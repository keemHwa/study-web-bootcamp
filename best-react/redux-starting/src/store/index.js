// redux logic
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

// const store = createStore(conterReducer); // 어떤 리듀서가 저장소를 변경하는지 인자로 전달 하여 저장소 생성
// const store = createStore(createSlice.reducer); // slice에 설정한 리듀서에 접근 가능

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
// slice는 여러개 일 수 있다. (데이터 마다 묶다보면 .. ) 하지만 store와  reducer는 하나여야한다.
/* 스토어 구조는 아래처럼 들어온다. 
  counter: { // initialState
    counter: 0, 
    showCounter: true
  }, 
  auth:{
    isAuthenticated : false
  }
  / => 이럴경우 useSelector 시 state.counter.counter / state.auth.shoCounter로 접근해야함.
  */
// 아니면 reducer : counterSlice.reducer // 단일시  state.counter로 받을 수 있다.

export default store;

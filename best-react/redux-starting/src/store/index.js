// redux logic
import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState, // initialState : initialState
  reducers: {
    // reducer는 객체 혹은 맵
    // 아래의 메서드는 자동으로 최근 state 값을 받는다
    // 여기선 액션을 했느냐에 따라 메서드가 자동호출되므로 액션 마다 if를 쓸 필요가 없다.
    // => 보일러 플레이트 코드를 줄 일 수 있다.
    increment(state) {
      state.counter++; // 직접 상태를 변경 할 수있게 됐다. (그렇게 보이는 것)
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // 추가 payload 필요, action 인자 추가
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

/* redux-toolkit 적용 전 
const conterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment": {
      return {
        ...state, // 현재 상태를 복사
        counter: state.counter + 1, // 직접 상태 변경이 아니라, 단순 계산값 반환
      }; // 새로운 객체를 생성
    }
    case "increase": {
      return {
        counter: state.counter + action.amount,
        showCounter: state.showCounter,
      };
    }
    case "decrement": {
      return {
        counter: state.counter - 1,
        showCounter: state.showCounter,
      };
    }
    case "toggle": {
      return {
        showCounter: !state.showCounter,
        counter: state.counter,
      };
    }
    default:
      return state;
  } // reducer가 반환하는 객체는 기존 상태 객체를 override한다.
  // 그래서 기존의 state를 직접 변경하여 return 해선 안되고, 새로운 상태 객체를 반환해야한다.
  // 이것을 지키지 않으면 redux가 상태 변경을 감지하지 못하고 예측 불가능한 동작이 발생 할 수 있다.
  /*
   추가 ) 리턴시 state.counter++은 안되고, state.counter+1이 되는 이유 
    state.counter++은 기존 counter의 상태를 직접적으로 변경한 것 
    state.counter+1은 현재값을 가져와 1을 더한 단순 계산된값을 반환한 것 
   */
//};

// const store = createStore(conterReducer); // 어떤 리듀서가 저장소를 변경하는지 인자로 전달 하여 저장소 생성
// const store = createStore(createSlice.reducer); // slice에 설정한 리듀서에 접근 가능
const store = configureStore({
  reducer: counterSlice.reducer,
});
// slice는 여러개 일 수 있다. (데이터 마다 묶다보면 .. ) 하지만 reducer는 하나여야한다.
//  -> configureStore를 이용해  여러개 slice.reducer를 하나로 합친다..
// reducer: { counter: counterSlice.reducer.
//             toggle: testSlice.reducer } => 이럴경우 useSelector 시 state.counter.counter / state.toggle.shoCounter로 접근해야함 ,
export const counterActions = counterSlice.actions; // 액션 객체 생성  type 프로퍼티도 이미 가지고 있다. (리듀서와 이름이 같으면 됨)

export default store;

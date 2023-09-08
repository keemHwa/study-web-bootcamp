// redux logic
import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };
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
};

const store = createStore(conterReducer); // 어떤 리듀서가 저장소를 변경하는지 인자로 전달 하여 저장소 생성

export default store;

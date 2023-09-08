const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  // 기존 상태와 발송된 액션을 파라미터로 받는다.
  if (action.type === "increment") {
    return {
      // 기존 상태를 대체할 새로운 상태 객체를 return 한다.
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};
// reducer는 액션이 도착할 때마다 새로운 상태 스냅샷을 뱉어내야합니다.
// 항상 새로운 상태 객체를 리턴해야만 한다.
// -> 동일한 입력값을 넣으면 항상 정확히 같은 출력이 산출 되어야한다.

const store = redux.createStore(counterReducer); // 어떤 리듀서가 그 저장소를 변경 하는지 저장소가 알아야 하기에 인자로 전달

const counterSubscriber = () => {
  const latestState = store.getState();
  // getState()는 createStrore()로 생성된 저장소에서 사용 할 수 있는 메서드
  // 그리고 업데이트된 후에 최신 상태 스냅샷을 제공할 것
  console.log(latestState);
};

store.subscribe(counterSubscriber); //  데이터와 저장소가 변경 될 때마다 counterSubscriber 실행
store.dispatch({ type: "increment" }); //액션객체를 발송하는 메서드
//{counter : 2 } (counterReducer에서 액션 구분전 ) 초기화 : 1 -> 새로운 액션을 발송해서 counterReducer를 실행했기에 counter가 다시 1 증가함
store.dispatch({ type: "decrement" });

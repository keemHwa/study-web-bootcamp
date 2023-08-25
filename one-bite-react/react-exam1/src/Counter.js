import React, { useState } from "react";
import OddEvenResult from "./OddEvenResult";

// const Counter = (props) => {
const Counter = ({ initialValue }) => {  // ... spread해서 넘어 오기때문에 initialValue값만 따로 이런식으로도 받을 수있음
    // console.log(props); //{checkNum: 4, initialValue: 5}객체에 담겨서 온다. 
 

    // 0에서 출발
    // 1씩 증가하고
    // 1씩 감소하는
    // count 상태
    
    // 컴포넌트(여기선 count) 의 상태 (+/-) 가 바뀔 때 마다 화면을 다시 그린다 => 이걸 리렌더(Counter 함수 재호출) 라고한다. 
    const [count, setCount] = useState(initialValue);
        /* useState를 통해 컴포넌트에 상태(변수)를 추가한다. 
         useState는 두개의 요소가 있는 배열을 반환한다.
        1. 상태 변수
        2. 상태를 변경하는데 사용하는 함수 */

    const onIncrease = () => {
        setCount(count + 1);
    }

    const onDecrease = () => {
        setCount(count - 1);
    }


    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEvenResult count={count} />
        </div>
    )    
    
}

Counter.defaultProps = {
    initialValue : 0
} // props default값 지정 

export default Counter;
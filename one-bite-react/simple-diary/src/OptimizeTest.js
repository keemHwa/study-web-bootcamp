import React, { useEffect, useRef,useState } from "react";


const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`Update :: CounterA is ${count}`); // 출력 X, 변경 되지 않았기 때문에 
    })
    return <div>{count}</div>
});

const CounterB = ({ obj }) => {
    useEffect(() => {
        console.log(`Update :: CounterB is ${obj.count}`)
        // React.memo 하면서 두번째 인자로 비교 함수를 주지않으면 출력 O 
            // setObj 하면서 다른 객체를 참조(객체는 주소값참조)하기 때문에
    })
    return <div>{obj.count}</div>
};

const areEqual = (prevProps, nextProps) => {
    // if (prevProps.obj.count === nextProps.obj.count){
    //     return true // 이전 props와 현재 props가 같다. -> 리렌더링 발생 X 
    // } 
    // return false // 이전 props와 현재 props가 다르다 -> 리렌더링 발생 O
    return prevProps.obj.count === nextProps.obj.count;
}

const MomoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count:1
    });

    return (
        <div style={{ padding: 20 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={() => {setCount(count)}}>button A</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MomoizedCounterB obj={obj}/>
                <button onClick={() => {
                    setObj({
                        count:obj.count
                    })
                }}>
                button B    
                </button>
            </div>
        </div>
    )
}

export default OptimizeTest;
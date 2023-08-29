import React, { useEffect, useState } from 'react';

const Lifecycle = () => {
    
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        console.log("Mount!");
    }, []) //[] dependency array에 빈 배열이 전달 될 시, Mount 시점에만 작동
    
    useEffect(() => {
        console.log("Update!");
    },) // dependency array 전달 X ,  리렌더링(컴포넌트 update) 시점에 작동

    useEffect(() => { // dependency array 값이 변할 시 콜백 함수 실행 
        console.log(`count is update ${count}`)
        if (count > 5) {
            alert('count가 5를 초과하였습니다. 1로 초기화합니다.');
            setCount(1);
        }
    }, [count]) 
    
    useEffect(() => { 
        console.log(`text is update ${text}`)
    },[text]) 
    
    return (
        <div style={{ padding: 20 }}>
        <div>
            {count}
            <button onClick={() => {
                setCount(count+1)
            }}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e) => {
                setText(e.target.value);
            }}/>
        </div>
    </div>
    )
    
}

export default Lifecycle;

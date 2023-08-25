const OddEvenResult = ({ count }) => { // 객체로 넘어오기때문에 비구조화
    // 부모가 내려준 prop의 상태가 변경될 때마다 re-render를 한다. 
        // 또한 부모가 re-render 될 때 마다 자식도 re-render가 된다. 
    console.log(count);
    return <div>{count % 2 === 0 ? '짝수' : '홀수'}</div>;
}



export default OddEvenResult; 
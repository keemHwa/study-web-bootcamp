
const Container = ({ children }) => {
    // 컴포넌트도 prop으로 받을 수있다.
    // console.log(children); // react.element

    // 이스케이프(Escape). 특정 문자를 원래의 기능에서 벗어나게 변환하는 행위
    // style = {{}}  1. 첫번째 중괄호 는 jsx를 escape 한다. 즉 js  2. 두번째 중괄호는 객체를 뜻한다. 
    return (
        <div style={{ margin: 20, padding: 20, border: '1px solid gray' }}> 
            {children}
        </div>
    );
}

export default Container;

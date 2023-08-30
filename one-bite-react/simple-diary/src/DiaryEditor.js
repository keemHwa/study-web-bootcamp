import React, { useEffect, useState,useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
    
    useEffect(() => {
        console.log(' DiaryEditor REDDER'); 
        // 초기에 위 로그가 두번 찍히는 이유
        // 1. app 컴포넌트가 처음 실행 될 때 
        // 2. getDate() 이후 결과 값을 SetData하면서 App 컴포넌트가 리렌더되면서 그 안에 있는 함수(여기선 onCreacte) 가 다시 만들어짐      
            // 삭제(onRemove) 후에도 다시 log가 찍힌다. 
            // 똑같이 setData하면서 App 컴포넌트가 리렌더 되면서 onCreate가 다시 만들어지기 때문 
    })

    const authorInput = useRef(); //React.MutableRefObject를 반환하는데 html dom elemte에 접근 할 수있게 해준다. 
    const contentInput = useRef();

    const [state, setState] = useState({
        author: '',
        content: '',
        emotion:'1'
    })
    // console.log(state); //{author: '', content: ''} => 즉 useState에 들어온 값을 상태 변수의 값으로 한다.

    // const [author, setAuthor] = useState(0);  const [content, setContent] = useState(0);    // 위처럼 묶을 수있다. 
  
    const handleChangeState = (e) => {
        setState({// 기존 setAuthor(e.target.value)와 달리 객체의 값을 바꾸려면 인자로 객체를 만들어서 주어야한다.                        
            // content: state.content, 매번 이런식으로 기존값 set을 위해 추가하기보다는 아래와 같이 spread를 이용하여 기존값을 가져온다
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeSubmit = () => {
        
        if (state.author.length < 1) {
            // alert('작성자는 최소 1글자 이상 입력해주세요.'); // alert 을 띄우는건 좋지 못한 ux 경험 
            authorInput.current.focus();
            //authorInput.current = input 
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        setState({
            author: '',
            content: '',
            emotion: 1
        }); //  저장 후 초기화 

    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    name='author'
                    value={state.author}
                    onChange={handleChangeState} />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name='content'
                    value={state.content}
                    onChange={handleChangeState} />
            </div>
            <div>
                <label htmlFor="emotion">오늘의 감정일기 : </label>
                <select name='emotion' id="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleChangeSubmit}>저장</button>
            </div>
        </div>
    )
}

export default React.memo(DiaryEditor);
// React.memo는 넘겨받은 props의 변경 여부만을 체크한다
// .하지만 컴포넌트 내부에서 useState같은 훅을 사용 하고 있는 경우에는 상태가 변경 되면 리렌더링 된다.
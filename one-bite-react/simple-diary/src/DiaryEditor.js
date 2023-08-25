import { useState } from "react";

const DiaryEditor = () => {

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
        console.log(state);
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input name='author' value={state.author} onChange={handleChangeState}/>
            </div>
            <div>
                <textarea name='content' value={state.content} onChange={handleChangeState} />
            </div>
            <div>
                <label for="emotion">오늘의 감정일기 : </label>
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

export default DiaryEditor;
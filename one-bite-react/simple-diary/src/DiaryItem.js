import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({  id, author, content, emotion, create_date }) => { //onEdit, onRemove는 data state가 변하면 재생성될수밖에 없다.
    
    const {onEdit, onRemove,} = useContext(DiaryDispatchContext);// context에서 데이터를 가져오기

    const [isEdit, setIsEdit] = useState(false); // true,false에 따라 수정여부 확인 -> 수정폼을 보여줄지
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContet] = useState(content); // 수정폼
    const localContentInput = useRef();

    useEffect(() => {
        console.log(`${id}번째 아이템 렌더 ! `); 
        /**
         *     // 하나만 삭제해도 다른 일기도 모두 리렌더링 되는 이슈 발생 ! 
         * 0번째 아이템 렌더 ! 
            1번째 아이템 렌더 ! 
            2번째 아이템 렌더 ! 
            3번째 아이템 렌더 ! 
            4번째 아이템 렌더 ! 
         */
    })

    const handleRemove = () => {
        if (window.confirm(`${Number(id)+1}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }

    const handleQuitEdit = () => { // 수정 취소 시 
        setIsEdit(false);
        setLocalContet(content);
    }

    const handleEdit = () => {
        // 유효성 체크
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if (window.confirm(`${id + 1}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent); 
            toggleIsEdit();
        }
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span> 작성자 : {author} | 감정점수 : {emotion} </span>
                <br/>
                <span className="date"> {new Date(create_date).toLocaleString()} </span>
            </div>            
            <div className="content">
                {isEdit ? (<>
                    <textarea ref={localContentInput} value={localContent} onChange={(e) => {
                        setLocalContet(e.target.value);
                    }}/>
                </>) :
                    <>{content}</>}
            </div>
            {isEdit ?(
                <>
                <button onClick={handleQuitEdit}> 수정 취소</button>
                <button onClick={handleEdit}> 수정완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}
        </div>
        
    )
}

export default React.memo(DiaryItem); //이렇게 함으로써 변동이 없는 항목은 렌더링 하지 않고 기존걸 재사용한다. 
// useCallback 사용만으로는 하위 컴포넌트의 리렌더를 막을 수 없다! 하위 컴포넌트가 참조 동일성에, 의존적인, 최적화된 Purecomponent!이어야만 비로소 불필요한 리렌더링을 막을 모든 것이 완성된다.

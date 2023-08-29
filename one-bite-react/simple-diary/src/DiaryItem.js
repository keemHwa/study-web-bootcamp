import { useRef, useState } from "react";

const DiaryItem = ({ onEdit, onRemove, id, author, content, emotion, create_date }) => {
    
    const [isEdit, setIsEdit] = useState(false); // true,false에 따라 수정여부 확인 -> 수정폼을 보여줄지
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContet] = useState(content); // 수정폼
    const localContentInput = useRef();

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

export default DiaryItem;


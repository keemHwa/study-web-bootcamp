import DiaryItem from "./DiaryItem";

const DiaryList = ({ onRemove,onEdit, diaryList}) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => ( // map return 값이 있을 때 {} 들어온다 ! 또는 객체를 나타날 때  
                    // 고유한 아이디가 없을 때는 idx로도 map(it,idx)=>{} 로 받아 key prop으로 사용가능 
                    // <div key={it.id}>    {/* Each child in a list should have a unique "key" prop.. 개발자모드에서 보이지는 X */}                       
                    //     <div> 작성자 : {it.author}</div>
                    //     <div> 일기 : {it.content}</div>
                    //     <div> 감정 : {it.emotion}</div>
                    //     <div> 작성 시간(ms) : {it.create_date}</div>
                    // </div>
                    <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
                ))}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList:[]
}
export default DiaryList;

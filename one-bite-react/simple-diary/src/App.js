import { useState,useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


// const dummyList = [
//   {
//     id: 1,
//     author: "테리",
//     content: "하이1",
//     emotion: 3,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author: "세나",
//     content: "하이1",
//     emotion: 5,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "미모쟈",
//     content: "하이1",
//     emotion: 1,
//     create_date: new Date().getTime()
//   }
// ];


function App() {

  const dataId = useRef(0); //useRef의 일반적인 변수 대신 사용 (어떤 dom도 선택 X, 0을가르킴 )
  const [data, setData] = useState([]); // 일기배열 
  
  // 리액트는 데이터가 단방향으로 흐르기때문에, data를 변경할 수 있는 setData를 밑으로 보내주어 data를 변경 할 수 있게 해야한다. 

  const onCreate = (author, content, emotion) => { 
    const create_date = new Date().getTime();
    const newItem = { // 단축 속성명 : 키와 값의 이름이 같을 경우 사용할 수있다.
      author, // author: author 
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]); // 새 데이터 +  기존 데이터 전개
  };

  const onRemove = (targetId) => {
    console.log(`전달 ${targetId}`); // 해당 id 를 가진 요소를 제외한 새로운 배열을 반환 -> data 상태가 변했기 때문에 dataList가 다시 렌더 
    const newDiary = data.filter((it) => it.id !== targetId);
    setData(newDiary);
  }
  
  const onEdit = (targetId, newContent) => {
    console.log(targetId, newContent)
    setData(data.map((it) => it.id === targetId ? { ...it, content: newContent } : it));
    
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit} />  { /* diaryItem에서 ondelete를 호출 할 수 있어야하므로, 그의 부모인 diaryList에 전달*/}
    </div>
  );
}

export default App;

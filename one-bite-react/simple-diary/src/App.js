import { useMemo, useState,useRef, useEffect, useCallback } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import OptimizeTest from './OptimizeTest';
// import Lifecycle from './Lifecycle';
// import LifecycleUnmount from './LifecycleUnmount';

function App() {

  const [data, setData] = useState([]); // 일기배열 
  const dataId = useRef(0); //useRef의 일반적인 변수 대신 사용 (어떤 dom도 선택 X, 0을가르킴 )
  
  const getDate = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then((res) => res.json());
    //console.log(res);
    
    const initData = res.map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    setData(initData);
  }

  useEffect(() => {
    getDate();  
  }, []); // mount, 컴포넌트 탄생시 실행

 
  // 리액트는 데이터가 단방향으로 흐르기때문에, data를 변경할 수 있는 setData를 밑으로 보내주어 data를 변경 할 수 있게 해야한다.
  const onCreate = useCallback(
    (author, content, emotion) => { // useCallback을 쓰는 이유 : data 길이 상관없이 컴포넌트가 mount되는 시점에 한번만 생성해서, 이후 일기 삭제나 기타 동작 시 재생성 되지 않도록 하기위해  
                                      // => 이후 data추가시 기존에 데이터는 사라지고 새로 추가한 데이터만 들어오는 이슈 발생 !
                                          // 왜냐하면 생성 당시 data는 빈 배열(현재 data값을 가져오지 못함) 이기에 이후 onCreate시 빈배열에 data가 추가된다.
                                          // 이걸 고치려면 dependency array에 data를 넣고 data가 변경 될 때 재생성하게끔 해야하는 딜레마에 빠진다.
                                          // 함수형 업데이트(상태변화 함수(set)에 함수를 전달) 를 사용하면 된다. ex) setData((data)=>...)
                                          // 이렇게 함으로써 한번만 생성하고, 추가 시 최신의 데이터를 가져와서 추가 할 수있다.  -> 연관없는 action을 줄이는..!
    console.log("onCreate ! ! ");
    const create_date = new Date().getTime();
    const newItem = { // 단축 속성명 : 키와 값의 이름이 같을 경우 사용할 수있다.
      author, // author: author 
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    //setData([newItem, ...data]); // 새 데이터 +  기존 데이터 전개
      setData((data) => [newItem, ...data]); // 최신의 state 인자로 가져오게된다. 
  },[]);

  const onRemove = useCallback((targetId) => { // onRemove는 한번만 생성되고 -> 재생성되면서 useEffect을 타는일은 없을 것 
    //console.log(`전달 ${targetId}`); // 해당 id 를 가진 요소를 제외한 새로운 배열을 반환 -> data 상태가 변했기 때문에 dataList가 다시 렌더 
    setData(data => data.filter((it) => it.id !== targetId)); // 최신의 state
  }, []);
  
  const onEdit = useCallback((targetId, newContent) => {
    setData(data=>data.map((it) => it.id === targetId ? { ...it, content: newContent } : it));
  }, []);

  // 감정 점수 비율
  const getDiaryAnalysis = useMemo(
    () => {
      // useMemo React의 Hook 중 하나로
        // 계산 비용이 높은 연산의 결과를 캐싱하고, 이전 결과와 다를 때만 다시 계산하는 데 사용
        // 두번째 인자(data.length)로 넘긴 데이터에 변동이 있을 경우에만 콜백 함수 실행
        // 또한 콜백 함수가 리턴하는 값을 return 한다. 
      //console.log("일기 분석 시작");
      // 해당 로그 2번 호출 
      // -> 1. App 컴포넌트가 처음 mount 될 때 출력
      // -> 2. getDate() api가 성공 후 setData가 이루어 지면서  App 컴포넌트가 리렌더되면서 그안에 있는 함수가 재생성 될 때                                
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };
    },[data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <OptimizeTest/> */}
      {/* <Lifecycle/> */}
      {/* <LifecycleUnmount/> */}
      <DiaryEditor onCreate={onCreate} />
      <div> 전체 일기 : {data.length} </div>
      <div> 기분 좋은 일기 개수 : {goodCount} </div>
      <div> 기분 나쁜 일기 개수 : {badCount} </div>
      <div> 기분 좋은 일기 비율 : {goodRatio} </div>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit} />  { /* diaryItem에서 ondelete를 호출 할 수 있어야하므로, 그의 부모인 diaryList에 전달*/}
    </div>
  );
}

export default App;

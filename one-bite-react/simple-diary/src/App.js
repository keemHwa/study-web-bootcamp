import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


const dummyList = [
  {
    id: 1,
    author: "테리",
    content: "하이1",
    emotion: 3,
    create_date: new Date().getTime()
  },
  {
    id: 2,
    author: "세나",
    content: "하이1",
    emotion: 5,
    create_date: new Date().getTime()
  },
  {
    id: 3,
    author: "미모쟈",
    content: "하이1",
    emotion: 1,
    create_date: new Date().getTime()
  }
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;

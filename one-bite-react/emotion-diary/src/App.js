import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import New from './pages/New'; 
import Edit from './pages/Edit'; 
import Diary from './pages/Diary'; 
// import RouteTest  from './components/RouteTest';

// COMPONENTS
import MyButton from './components/MyButton';
import MyHeader from './components/Myheader';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headerText={'APP'}
          leftChild={<MyButton text={'왼쪽버튼'} onClick={() => alert('오모나')} />}
          rightChild={<MyButton text={'오른쪽버튼'} onClick={()=>alert('오모나 오')}/>}
        />
        <h2>App.js</h2>{/* 어떤 컴포넌트에서든 다 보여야한다면 Routes밖에 뺀다. */}
        <MyButton text={'버튼'} onClick={() => alert('test')} type={'positive'} />
        <MyButton text={'버튼'} onClick={() => alert('test')} type={'negative'} />
        <MyButton text={'버튼'} onClick={() => alert('test')} type={'dsfssfsfsfsdfds'} />
        {/* <RouteTest/> */}
        <Routes> {/* Routes 안에 있는 컴포넌트만 경로 따라간다. */}
          <Route path='/' element={<Home/>}></Route>
          <Route path='/new' element={<New/>}></Route>
          <Route path='/edit' element={<Edit/>}></Route>
          <Route path='/diary/:id' element={<Diary/>}></Route>
          {/* 컴포넌트와 실제 경로 매핑 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

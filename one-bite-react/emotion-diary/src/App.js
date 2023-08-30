import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './pages/Home'; 
import New from './pages/New'; 
import Edit from './pages/Edit'; 
import Diary from './pages/Diary'; 
// import RouteTest  from './components/RouteTest';

// COMPONENTS
import MyButton from './components/MyButton';
import MyHeader from './components/Myheader';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      newState = [action.data, ...state];
      break; // 없으면 다음 case문을 실행한다. 
    }
    case 'REMOVE': {
      newState = state.filer((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext(); // context API
export const DiaryDispatchContext = React.createContext(); // context API

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  
  const dataId = useRef(1);
  
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id : dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion 
      }
    })
    dataId.current++;
  }
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId
    })
  }
  // EDIT 
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
        <div className="App">
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>      
  );
}

export default App;

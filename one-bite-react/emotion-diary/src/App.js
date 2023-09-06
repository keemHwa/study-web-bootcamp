import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
// import RouteTest  from './components/RouteTest';

// COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/Myheader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      newState = [action.data, ...state];
      break; // 없으면 다음 case문을 실행한다.
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext(); // context API
export const DiaryDispatchContext = React.createContext(); // context API

function App() {
  useEffect(() => {
    //LocalStorage 활용
    const localData = localStorage.getItem("diary"); // string

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      ); // sort 내림차순 아이디 정렬 (반환 값이 0 보다 크면 b가 앞으로 온다. )

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        // useEffect는 컴포넌트가 렌더링 및 업데이트 되고 나서 수행되기 때문에
        // 여기서 dataId를 사용해도 문제없다.
        dispatch({ type: "INIT", data: diaryList });
      }
    }

    //const item3 = JSON.parse(localStorage.getItem("item3"));
    //localStorage.setItem("item3", JSON.stringify({ value: 20 }));
    //localStorage는 기본적으로 문자로 저장한다 -> 객체는 문자열로 저장해야함
  }, []);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(data.length + 1);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            {/* <RouteTest/> */}
            <Routes>
              {" "}
              {/* Routes 안에 있는 컴포넌트만 경로 따라간다. */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
              <Route path="/diary/:id" element={<Diary />}></Route>
              {/* 컴포넌트와 실제 경로 매핑 */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

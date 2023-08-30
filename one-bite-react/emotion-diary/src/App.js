import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import New from './pages/New'; 
import Edit from './pages/Edit'; 
import Diary from './pages/Diary'; 
// ./ => 현재 경로

import RouteTest  from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <h2>App.js</h2>{/* 어떤 컴포넌트에서든 다 보여야한다면 Routes밖에 뺀다. */}
        <RouteTest/>
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

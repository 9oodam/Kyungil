import './App.css';
import {Main, Detail} from './pages';
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
      console.log("전체 : ", list);
  }, [list]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main list={list} setList={setList} />} />
        <Route path='/detail/:id' element={<Detail list={list} />} />
      </Routes>
    </div>
  );
}

export default App;

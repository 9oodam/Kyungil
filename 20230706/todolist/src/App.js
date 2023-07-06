import './App.css';
import {Main, Detail} from './pages';
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrev } from './redux/features/setPrev';

import Top from './components/Top/Top';
import Mid from './components/Mid/Mid';
import Bottom from './components/Bottom/Bottom';
import { Subject } from './components/Top/Top.styled';
import { reset } from './redux/features/setPost';

function App() {
  const dispatch = useDispatch();

  const startLotto = () => {
    dispatch(setPrev());
    dispatch(reset());

    
  }

  return (
    <div className="App">
      <Subject onClick={startLotto}>Game Start</Subject>
      <Top />
      <Mid />
      <Bottom />
    </div>
  );
}

export default App;

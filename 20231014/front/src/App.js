import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Login, Main, Mypage, Register} from "./pages";

const App = () => {

  return (
    <>
      <div id='body'>
        <div id='container'>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Main />} />
              <Route path='/mypage' element={<Mypage />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;

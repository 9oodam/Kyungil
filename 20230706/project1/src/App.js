import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'; // Navigate : 브라우저의 경로를 바꿔줌
import {Detail, Login, Main, MyPage, Shop} from './pages';
import {useState, useEffect} from 'react';

function App() {
  const [login, setLogin] = useState(false);

  // 로그인 상태일 때만 갈 수 있게 (로그인 안되어있으면 Main으로 리다이렉트)
  const Redirect = () => {
    return login == true ? <MyPage login={login} /> : <Navigate to={'/'} />
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main login={login} />} />
        
        <Route path='/shop' element={<Shop login={login} />} />

        {/* setLogin() 함수 전달 */}
        <Route path='/login' element={<Login login={login} setLogin={setLogin} />} />

        {/* params로 각각 상품의 id, num, name 전달 */}
        <Route path='/detail/:id/:num/:name' element={<Detail login={login} />} />

        {/* 로그인 상태일 경우에만 들어갈 수 있게 */}
        <Route path='/mypage' element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;

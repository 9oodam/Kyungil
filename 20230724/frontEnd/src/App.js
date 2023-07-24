import './App.css';
import {Login, Board} from './pages'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/board' element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Main, Win, Lose} from './pages';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/win' element={<Win />} />
        <Route path='/lose' element={<Lose />} />
      </Routes>
    </div>
  );
}

export default App;

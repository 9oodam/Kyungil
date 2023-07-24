import './App.css';
import {produce} from 'immer';
import {add, remove, add2, remove2, temp} from './features/countSlice';
import {useDispatch, useSelector} from 'react-redux'

function App() {
  const dispatch = useDispatch();

  const num = useSelector(state => state.count.num);
  const num2 = useSelector(state => state.count2.num2);
  const value = useSelector(state => state.count2.value);

  // 기존 객체
  const state = {
    value : 0,
    arr : []
  }

  // 새로운 객체
  const nextState = produce(state, dra => { // 이전 객체를 받아서 복사
    console.log(dra);

    // 기존 객체는 유지하면서 새로운 값을 만들어서 반환
    dra.value += 1; 
    dra.arr.push("a");
    // 값이 변해도 바뀐 것을 감지하지 못하기 때문에 불변성을 지킬 수 있음
  })

  console.log("state : ", state);
  console.log("nextState : ", nextState);


  return (
    <div className="App">
      <div>
        <br></br>
        number : {num}
        <br></br><br></br>
        <button onClick={() => {dispatch(add())}}>+</button>
        <button onClick={() => {dispatch(remove())}}>-</button>
      </div>

      <div>
        <br></br>
        number2 : {num2}
        <br></br><br></br>
        <button onClick={() => {dispatch(add2())}}>+</button>
        <button onClick={() => {dispatch(remove2())}}>-</button>
      </div>

      <div>
        <br></br>
        {value}
        <br></br>
        <button onClick={() => {dispatch(temp("seoul"))}}>get weather info</button>
      </div>
    </div>
  );
}

export default App;

// immer : react에서 불변성을 유지하는 코드를 작성할 수 있게 도와주는 라이브러리
// npm i immer

// react에서는 기본적으로 부모에서 받은 props를 내부의 상태인 state가 변경됐을 때 리렌더링 됨
// 이 때 불변성을 이용하여 props와 state의 변화를 감지
// 얕은 비교(객체의 참조를 복사한다는 점을 통해 비교)를 통해 변경이 이루어짐
// 얕은 복사? 깊은 복사?


// redux-toolkit
// npm i @reduxjs/toolkit
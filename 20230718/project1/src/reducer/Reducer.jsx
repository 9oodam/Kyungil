import React, { useReducer } from "react";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// 더하기 뺄셈만 간단하게 구현

// useState를 사용하던 것과 별로 크게 차이가 없음
// react에서 제공해주는 내장 hook 함수

const Reducer = () => {
  // 상태 초기값
  const init = {
    count: 0,
  };

  // reducer 함수 매개변수로 상태와 액션 (콜백함수)
  const reducer = (state, action) => {
    // type 이라는 키값을 전달받음
    // action객체 reducer함수는 반환값이 있어야 하니까 return
    const { type, payload } = action;
    
    switch (type) {
      case INCREMENT:
        // 이전상태를 가지고 기능을 작성 한뒤에 반환값으로 상태를 업데이트
        return { ...state, count: state.count + 1 };

      case DECREMENT:
        return { ...state, count: state.count - 1 };

      default:
        return state;
    }
  };

  //  useReducer 함수에 매개변수로 첫번째는 메뉴판 두번째는 초기값을 전달
  const [state, dispatch] = useReducer(reducer, init);

  return (
    <div>
      지금 count의 상태는:{state.count}
      <button
        onClick={() => {
          dispatch({ type: INCREMENT });
        }}
      >
        더하기
      </button>
      <button
        onClick={() => {
          dispatch({ type: DECREMENT });
        }}
      >
        빼기
      </button>
    </div>
  );
};

export default Reducer;

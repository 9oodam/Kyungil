import React, { createContext, useContext, useState } from "react";

// useContext는 리액트에서 제공해주는 내장 hook함수
// 전역 상태 관리를 도와주는 함수
// react는 데이터의 흐름이 단방향 자식에게 props로 전달 하기 때문에 불편
// props로 데이터를 넘겨주지 않아도 컴포넌트들이 데이터를 공유 할 수 있도록
export const Global = createContext();
// createContext 함수를 호출해서 Global객체 생성 context 객체 생성

const Context01 = () => {
  return (
    <>
      <Context02></Context02>
    </>
  );
};

const Context02 = () => {
  const { name, setName } = useContext(Global);
  // Global.Provider value로 전달한 값을 받기위해
  // useContext()배개 변수로 context 객체를 전달
  return (
    <>
      내 이름은{name}
      <button
        onClick={() => {
          setName("lee");
        }}
      >
        이름 변경
      </button>
    </>
  );
};

const Context = () => {

  const [name, setName] = useState("koo");

  // 부모의 상태 변수 name과 상태변수 업데이트 함수 setName을 객체의 키값으로 obj 객체 선언
  const obj = {
    name,
    setName,
  };

  return (
    // 전역 상태를 관리할 때 Global.Provider를 최상단 크리로 감싸주고
    // value는 정해진 키 전달할 데이터를 넣어줌 (= 전역 상태)
    <Global.Provider value={obj}>
      <Context01>Context</Context01>
    </Global.Provider>
  );
};

export default Context;

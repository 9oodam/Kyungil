import React, { useMemo, useState } from "react";

const Memo = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleCount = () => {
    console.log("count");
    setCount(count + 1);
  };

  // 컴포넌트의 리랜더링을 관리
  // 부모 컴포넌트가 리랜더링 되면 자식 컴포넌트가 리랜더링 되는데
  // 부모 컴포넌트 안에 자식 컴포넌트가 많은 경우 전부 리랜더링 되기 때문에 페이지가 최적화되지 않음
  const handleCount2 = useMemo(() => {
    console.log("count2");
    return count2 + 1;
  }, [count2]);
  // 카운트 2를 주시하고 있다가 값이 변하면 새로운 값으로 업데이트

  return (
    <div>
      <p>memo</p>
      <button onClick={handleCount}>더하기</button>
      <p>카운트 : {handleCount2}</p>
      
    </div>
  );
};

export default Memo;

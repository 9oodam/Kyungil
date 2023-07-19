import React, { useCallback, useState } from "react";

const CallBack = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  // count2값이 변하기 전까지는 메모이제이션 콜백을 반환
  const handleCount = useCallback(() => {
    setCount(count + 1);
  }, [count2]);

  const handleCount2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <div>
      <div>
        <h1>첫 번째 카운트{count}</h1>
        <p>메모이제이션 콜백이기 때문에 count2가 변해야만 변함</p>
        <button onClick={handleCount}>count</button>
      </div>
      <div>
        <h1>두 번째 카운트{count2}</h1>
        <button onClick={handleCount2}>count</button>
      </div>
    </div>
  );
};

export default CallBack;

import {useState, useEffect} from "react";
import useWeb3 from './hooks/web3.hook';
import abi from "./abi/Counter.json";

const App = () => {
  const {user, web3} = useWeb3();
  const [count, setCounter] = useState(0);

  // CA의 상태변수를 조회
  const getCount = () => {
    if(web3 === null) return;

    // abi 파일에 있는 배열을 순회하면서 name이 getValue인 객체 찾기
    const getValueData = abi.abi.find((data) => data?.name === "getValue");
    // 실행시킬 내용을 인코딩된 값으로 담기
    const data = web3.eth.abi.encodeFunctionCall(getValueData, []);
    // 원격 프로시저 호출
    web3.eth.call({
      to : "0xB6FF1111AA9D86ecA50D5EA8255ae592e2103e7c", // CA
      data
    }).then((data) => { // 상태변수가 매개변수로 들어옴
      const result = web3.utils.toBigInt(data).toString(10); // 16진수 -> 10진수
      setCounter(result);
    })
  }

  // 블록체인 네트워크에 요청을 보내서 상태변수를 변경
  // 누르면 1 증가
  const increment = async () => {
    const incrementData = abi.abi.find((data) => data?.name === "increment");
    const data = web3.eth.abi.encodeFunctionCall(incrementData, []);

    const from = user.account; // 접속한 유저의 지갑 주소
    const transactionData = await web3.eth.sendTransaction({
      from : from,
      to : "0xB6FF1111AA9D86ecA50D5EA8255ae592e2103e7c",
      data
    })
    console.log(transactionData);

    getCount();
  }

  // 누르면 1 감소
  const decrement = async () => {
    const decrementData = abi.abi.find((data) => data?.name === "decrement");
    const data = web3.eth.abi.encodeFunctionCall(decrementData, []);

    const from = user.account; // 접속한 유저의 지갑 주소
    const transactionData = await web3.eth.sendTransaction({
      from : from,
      to : "0xB6FF1111AA9D86ecA50D5EA8255ae592e2103e7c",
      data
    })
    console.log(transactionData);

    getCount();
  }

  useEffect(() => {
    if(web3 !== null) getCount();
  }, [web3])

  if(user.account === "") return "지갑 로그인 필요";

  return (
    <>
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
    </>
  )

}

export default App;

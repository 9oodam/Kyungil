import './App.css';

import {useState, useEffect} from 'react'
import Web3 from 'web3';

function App() {
  // 브라우저에서 이더리움 블록체인 상호작용 (메타마스크 확장 프로그램 사용)
  // 메타마스크는 외부 소유 계정 정보와 네트워크의 정보를 가지고 있음
  // 트랜잭션을 발생시키면 서명의 정보가 필요한데, 개인키를 직접 전달하는 게 아니라 메타마스크 안에 안전하게 보관되어 있음

  // 원격 프로시저 호출을 통해 컨트랙트의 함수를 실행시킬 수 있음
  // 네트워크의 메서드를 사용해서 계정의 정보, 작성되어 있는 로직 등을 사용할 수 있음

  // if login?
  // 데이터베이스로 구현 하는 경우 중앙화 데이터 베이스에 저장된 아이디 & 비밀번호 사용
  // 탈중앙화로 구현 하는 경우 사용자의 지갑 계정을 사용

  // npm i web3


  {/* 지갑 내용으로 계정 조회 */}
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(0);
  const [receiver, setReceiver] = useState(null);
  const [sendETH, setSendETH] = useState(0);

  useEffect(() => {
    (async () => {
      // window : 최상위 전역 객체
      // window.ethereum : 메타마스크 확장프로그램을 설치하면 사용 가능
      console.log(window.ethereum)
      const [data] = await window.ethereum.request({
        method : "eth_requestAccounts",
      })
      console.log(data);

      setAccount(data);
      setWeb3(new Web3(window.ethereum));
    })();
  }, [])

  const balanceBtn = async () => {
    const balance = await web3.eth.getBalance(account);
    const _balance = await web3.utils.fromWei(balance, "ether");
    setBalance(_balance)
  }

  // 카운트 앱
  // 스마트 컨트랙트 배포
  const sendTransaction = async () => {
    const ts = await web3.eth.sendTransaction({
      from : account,
      gas : "300000",
      data : "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063209652551461003b5780635524107714610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220b57537ffc44c76631bd862cd5f98e742116f8d5a3f0e3a7d4df17688037a6d3e64736f6c634300080d0033"
    });
    console.log(ts);
  }

  // EOA -> EOA 트랜잭션 발생해서 잔액 송금해보기
  const sendBalance = async () => {    
    const ts = await web3.eth.sendTransaction({
      from : account,
      to : receiver,
      value : web3.utils.toWei(sendETH, "ether")
    })
  }

  return (
    <div className="App">
      <br />
      {account || "로그인 하세요"} | {balance} ETH <button onClick={balanceBtn}>잔액 조회</button> 
      <br />
      <button onClick={sendTransaction}>컨트랙트 배포</button>
      
      <br /><br />

      <div>
        <label> 송금 보낼 계정 </label>
        <input onChange={(e) => setReceiver(e.target.value)}></input>
        <label> 송금할 금액 </label>
        <input onChange={(e) => setSendETH(e.target.value)}></input>
        <button onClick={sendBalance}>송금</button>
      </div>
    </div>
  );
}

export default App;

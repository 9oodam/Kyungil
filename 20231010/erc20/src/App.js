import { useState, useEffect } from 'react';
import './App.css';
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/ERC20.json";

const App = () =>  {
  const {user, web3} = useWeb3();

  const [ERC20Contract, setERC20Contract] = useState(null);
  const [network, setNetwork] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [token, setToken] = useState("0");
  const [sepolia, setSepolia] = useState("0");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");


  useEffect(() => {
    if(web3 !== null) {
      if(ERC20Contract) return;
      const ERC20 = new web3.eth.Contract(abi, "0xe472Fd7b58A677CBA4D0859ba2bF103A6aa0e598", {data : ""});
      setERC20Contract(ERC20);
    }
  }, [web3]);

  useEffect(() => {
    // 네트워크가 변경되면 발생하는 이벤트
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("현재 네트워크 : ", chainId);
      if(chainId === "0xaa36a7") {
        getAccounts();
      }
    });

    // 지갑이 변경되면 발생하는 이벤트
    window.ethereum.on("accountsChanged", (account) => {
      // console.log("현재 지갑 주소 : ", account);
      getAccounts();
    });

    if(!network) return;
    // 컨트랙트 인스턴스가 없고, 네트워크가 정상적일 때 실행
    getAccounts();
  }, [network]);

  // network 검사 (원하는 네트워크가 아닐시 원하는 네트워크로 변경)
  const switchNet = async () => {
    // net이 null이면 해당 네트워크에 있다는 뜻
    // wallet_switchEthereumChain : 매개변수로 전달한 chainID가 맞는지 확인하는 함수
    // 0x539 : ganache의 chainId를 해시화한 것
    // 0xaa36a7 : sepolia

    // const net = await window.ethereum.request({jsonrpc : "2.0", method : "wallet_switchEthereumChain", params : [{chainId : "0x539"}]});
    const net = await window.ethereum.request({jsonrpc : "2.0", method : "wallet_switchEthereumChain", params : [{chainId : "0xaa36a7"}]});
    setNetwork(net || true);
  }

  // 전달받은 매개변수의 잔액을 조회
  const getToken = async (account) => {
    if(!ERC20Contract) return;
    let result = web3.utils.toBigInt(await ERC20Contract.methods.balanceOf(account).call()).toString(10);
    result = await web3.utils.fromWei(result, "ether");
    return result;
  }

  // 전달받은 매개변수의 Seplia 보유수 조회
  const getSepolia = async (account) => {
    if(!ERC20Contract) return;
    let result = await window.ethereum.request({jsonrpc : "2.0", method : "eth_getBalance", params : [account, "latest"], "id" : 1});
    result = await web3.utils.fromWei(result, "ether");
    return result;
  }

  // 메타마스크의 모든 지갑 정보 조회
  const getAccounts = async () => {
    const accounts = await window.ethereum.request({method : "eth_requestAccounts"});

    // Promise.all : map으로 배열을 돌릴 때 promise 반환값을 모두 처리 후 넘어가기
    const accountsCom = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        const sepolia = await getSepolia(account);
        return {account, token, sepolia}
      })
    )
    // accountsCom = [{account : "0x123432342", token : 1000}, {account : "0x123432342", token : 1000}]

    setToken(await getToken(accounts[0]));
    setSepolia(await getSepolia(accounts[0]));
    setAccounts(accountsCom);
  }

  // 다른 지갑으로 토큰 전송
  const transfer = async () => {
    if(!value || !value2) return;
    await ERC20Contract.methods.transfer(value.replaceAll(" ", ""), await web3.utils.toWei(value2, "ether")).send({
      from : user.account,
    });
    getAccounts();
  }



  if(user.account === null) return "지갑 연결 요망";
  
  return (
    <>
      <button onClick={switchNet}>토큰 컨트랙트 연결</button>
      
      <h2>내 지갑</h2>
      <div>
        ADD : {user.account}<br/>
        DAM : {token}<br />
        SEP : {sepolia}
      </div>

      <h2>모든 지갑</h2>
      <div>
        {accounts.map((item, index) => (
        <div key={index}>
          ADD : {item.account}<br />
          DAM : {item.token}<br/>
          SEP : {item.sepolia}<br />
        </div>))}
      </div>

      <h2>전송</h2>
      <div>
        <label>To</label>
        <input onChange={(e) => setValue(e.target.value)}></input><br />
        <label>Amount</label>
        <input onChange={(e) => setValue2(e.target.value)}></input><br />
        <button onClick={transfer}>Send</button>
      </div>
    </>
  )
}

export default App;

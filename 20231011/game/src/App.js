import './App.css';

import { useState, useEffect } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Pokemon.json";

const App = () => {
  const {user, web3} = useWeb3();

  const [contract, setContract] = useState(null);
  const [token, setToken] = useState("0");
  const [myPokemon, setMyPokemon] = useState([]);

  const [accounts, setAccounts] = useState([]);
  const [buyers, setBuyers] = useState([]);

  const [who, setWho] = useState("");
  const [which, setWhich] = useState("");


  useEffect(() => {
    if(web3 !== null) {
      if(contract) return;
      const pokContract = new web3.eth.Contract(abi, "0xDA874FCf33b40ae8eE6C5903ab9AF5D27ccE4468", {data : ""});
      setContract(pokContract);
    }
  }, [web3]);


  // 해당 지갑의 포켓몬 조회
  const getPokemon = async (account) => {
    const result = await contract.methods.getPokemon().call({
      from : account
    });
    return result;
  }

  // 해당 지갑의 토큰량 조회
  const getToken = async (account) => {
    if(!contract) return;
    let result = web3.utils.toBigInt(await contract.methods.balanceOf(account).call()).toString(10);
    result = await web3.utils.fromWei(result, "ether");
    return result;
  }

  // 메타마스크 계정 조회
  const getAccounts = async () => {
    const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
    const _accounts = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        const pokemon = await getPokemon(account);
        return {account, token, pokemon};
      })
    );

    setToken(await getToken(user.account));
    setMyPokemon(await getPokemon(user.account))
    setAccounts(_accounts);
  }

  // 구매한 사용자만 보여주기
  const getBuyers = async () => {
    const accounts = await contract.methods.getPokemonUsers().call();
    const _accounts = await Promise.all(
      accounts.map(async ({account}) => {
        const pokemon = await getPokemon(account);
        return {account, pokemon}
      })
    )
    setBuyers(_accounts);
  }

  // 구매하기
  const purchase = async () => {
    await contract.methods.buyPokemon().send({
      from : user.account
    });
    getAccounts();
    getBuyers();
  }

  // 소유권 이전하기
  const movePokemon = async () => {
    await contract.methods.movePokemon(who, which).send({
      from : user.account
    });
    getAccounts();
    getBuyers();
  }


  useEffect(() => {
    if(!contract) return;
    getAccounts();
    getBuyers();
  }, [contract]);



  if(user.account == null) return "지갑 연결 요망";

  return (
    <div className='body'>
      <div className='container'>
        <div>
          <div className='container-top'>
            <h1>My Wallet ({user.account})</h1>
            <button onClick={purchase}>개 큰 구매하기</button>
          </div>
          <p>1) POK : {token}</p>
          <p>2) Pokemons : {myPokemon.length}</p>
          <div className='pok-container'>
            {myPokemon.map((item, index) => {
              return (
                <img src={item.url} onClick={() => setWhich(index)}></img>
              )
            })}
          </div>
        </div>

        <br />

        <div>
          <h1>Buyers</h1>
          {buyers.map((item, index) => (
            <div key={index} className='buyer-container'>
              <div>{item.account} ({item.pokemon.length})</div>
              <div className='pok-container'>
                {item.pokemon.map((item, index) => (
                  <img src={item.url}></img>
                ))}
              </div>
            </div>
          ))}
        </div>

        <br />

        <div>
          <h1>Whole Wallets in Metamask</h1>
          {accounts.map((item, index) => (
            <div key={index} className='user-container'>
              <p onClick={() => setWho(item.account)}>{item.account}</p>
              <p>POK : {item.token}</p>
              <p>Pokemons : {item.pokemon.length}</p>
              <div className='pok-container'>
                {item.pokemon.map((item, index) => (
                  <img src={item.url}></img>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='container2'>
        <h1>소유권 이전할 계정</h1>
        <div className='show'>{who}</div>
        <h1>이전할 포켓몬</h1>
        <div className='show'>
          {myPokemon.map((item, index) => {
            if(index == which) {
              return item.name
            }
          })}
        </div>
        <button onClick={movePokemon}>이전하기</button>
      </div>
    </div>

  )
}

export default App;

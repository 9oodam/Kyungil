import { useState, useEffect } from 'react';
import Web3 from "web3";

const useWeb3 = () => {
    const [user, setUser] = useState({
        account : "",
        balance : "",
    });

    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.request({method : "eth_requestAccounts"}).then(async ([data]) => {
                const web3Provider = new Web3(window.ethereum);

                setUser({
                    account : data,
                    balance : web3Provider.utils.toWei(await web3Provider.eth.getBalance(data), "ether")
                });

                setWeb3(web3Provider);

                // 현재 웹의 모든 메타마스크 지갑 계정 조회, 토큰 양 조회
                // 컨트랙트를 배포한 네트워크가 맞는지 확인, 아니면 네트워크 변경할 수 있게
                // 지갑을 바꾸면 바꾼 지갑 정보 브라우저에 렌더
            })
        }else {
            alert("메타마스크 연결 요망")
        }
    }, []);

    return {user, web3}
}

export default useWeb3;
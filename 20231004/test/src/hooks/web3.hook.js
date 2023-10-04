import {useState, useEffect} from "react";
import Web3 from "web3";

// 커스텀 훅 작성시 use를 붙여야 함
const useWeb3 = () => {

    // 현재 접속한 유저의 메타마스크 지갑 정보
    const [user, setUser] = useState({
        account : "",
        balance : "",
    });

    // 네트워크와 연결한 web3 인스턴스
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        // 이더리움 객체가 있는지 확인 (메타마스크 설치 되어있는지)
        if(window.ethereum) {
            window.ethereum.request({
                method : "eth_requestAccounts",
            }).then(async ([data]) => { // 반환 받은 값(배열)의 첫 번째 값을 구조분해할당
                // Web3 인스턴스 생성
                const web3Provider = new Web3(window.ethereum);
                setWeb3(web3Provider);
                setUser({
                    account : data,
                    // 현재 지갑의 잔액(wei)을 조회해서 eth로 변경
                    balance : web3Provider.utils.toWei(await web3Provider.eth.getBalance(data), "ether")
                })
            })
        }else {
            alert("메타마스크 설치하고 오세요^^")
        }
    }, []);


    return {
        user,
        web3
    }
}

export default useWeb3;
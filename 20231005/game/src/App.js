import { useEffect, useState } from "react"
import useWeb3 from "./hooks/web3.hook"
import abi from "./abi/Baseball.json"

const App = () => {
    // useWeb3 에서 작성한 유저, web3
    const { user, web3 } = useWeb3();

    const [ticket, setTicket] = useState("0")
    const [value, setValue] = useState("")
    const [reward, setReward] = useState("0")
    const [progress, setProgress] = useState("0")
    const [random, setRandom] = useState("000")
    const [message, setMessage] = useState("")
    
    // owner, owner의 주소
    const [ownerAddress, setOwnerAddress] = useState("")

    // 연결?
    const [baseballContract, setBaseballContract] = useState(null);
    useEffect(() => {
        console.log('여기가 시작')
        if (web3 !== null) {
            if (baseballContract === null) {
                const Baseball = new web3.eth.Contract(abi, "0x19dB0FfA7977F490B5777096EfCA6E67F1b3E159", { data: "" })
                console.log('baseballContract : ', Baseball)
                setBaseballContract(Baseball);
            }
        }
    }, [web3])

    // 티켓 금액
    const getTicket = async () => {
        if (baseballContract === null) return;
        const result = web3.utils.toBigInt(await baseballContract.methods.getTicketPrice().call()).toString(10);
        setTicket(await web3.utils.fromWei(result, "ether"))
    };

    // owner 계정
    const getOwnerAccount = async ()=>{
        const result2 = (await baseballContract.methods.getContractOwner().call()).toString(10);
        setOwnerAddress(result2.toLowerCase())
        console.log('owner address : ', result2)
    }

    // 보상
    const getReward = async () => {
        if (baseballContract === null) return
        const result = web3.utils.toBigInt(await baseballContract.methods.getReward().call()).toString(10);
        setReward(await web3.utils.fromWei(result, "ether"))
    };

    // 게임 중인지 확인
    const getPlaying = async () => {
        const playing = web3.utils.toBigInt(await baseballContract.methods.getPlay().call()).toString(10);
        setMessage(playing)
    }

    // 게임이 얼마나 진행됐는지 확인
    const getProgress = async () => {
        const progress = web3.utils.toBigInt(await baseballContract.methods.getProgress().call()).toString(10)
        setProgress(progress)
    }

    // 정답 확인
    const getRandom = async () => {
        const random = web3.utils.toBigInt(await baseballContract.methods.getRandom().call()).toString(10)
        setRandom(random)
    }

    // 게임 시작
    const gameStart = async () => {
        if (value.length < 3) {
            alert("Enter 3 digit number")
            return;
        }
        await baseballContract.methods.gameStart(Number(value)).send({
            from: user.account,
            value: web3.utils.toWei("5", "ether"),

        })
        render()
    }

    // 게임 재시작
    const gameReset = async () => {
        if (user.account === null) {
            alert("지갑과 연결해주세요");
            return;
        }
        const confirmReset = window.confirm("재시작 하시겠습니까?");

        if (confirmReset) {
            await baseballContract.methods.gameReset().send({
                from: user.account,
            });

            render();
        }
    }


    const render = () => {
        getTicket();
        getReward()
        getPlaying()
        getProgress()
        getOwnerAccount()
    }

    useEffect(() => {
        console.log('baseballContract 들어옴?')
        if (baseballContract !== null) {
            console.log('ㅇㅇ 렌더하자')
            render()
        }
    }, [baseballContract]);

    useEffect(()=>{
        console.log('user account : ', user.account);
        console.log('owner address : ', ownerAddress);
    },[ownerAddress])


    if (user.account === null) return "지갑의 계정을 확인해 주세요"
    return (
        <>
            <div>사용자 account : {user.account}</div><br />

            <div>티켓가격 : {ticket}</div>
            <div>현재 게임 진행도 : {progress} / 5</div>
            <div>총 상금 : {reward}</div>
            <div>진행 여부 : {message == 0 ? "게임 중" : "게임 종료"}</div>
            <input onChange={(e) => { setValue(e.target.value) }} placeholder="000 ~ 999 입력"></input>

            <div>정답 :  {random}</div><br />

            <button onClick={gameStart}>게임시작</button>
            <br />
            
            {ownerAddress==user.account && <button onClick={getRandom}>admin</button>}
            <br />
            <button onClick={gameReset}>재시작</button>
        </>
    )
}

export default App
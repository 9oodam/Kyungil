import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import abi from './abi/MyNFT.json';
import useWeb3 from './hook/web3.hook';

const App = () => {
  const {user, web3} = useWeb3();

  const [contract, setContract] = useState(null);

  useEffect(() => {
    if(web3 !== null) {
      if(contract) return;
      const nftContract = new web3.eth.Contract(abi, "0xb21f035Ad29C112b547F3b396dA4c7813142151f", {data : ""});
      setContract(nftContract);
    }
  }, [web3]);

  // 토큰 아이디
  const [tokenIdNum, setTokenIdNum] = useState('');
  // 이미지 파일
  const [file, setFile] = useState(null);
  // 이름
  const [name, setName] = useState('');
  // 설명
  const [description, setDescription] = useState('');
  // 이미지 해시
  const [imageHash, setImageHash] = useState('');
  // 민팅 성공 여부
  const [isMint, setIsMint] = useState(false);


  // 1. tokenId 겹치지 않게 만들어놓기
  const getTokenId = async () => {
    const num = await contract.methods.getTokenId().call();
    const num2 = web3.utils.toBigInt(num).toString(10);
    console.log(num2)
    setTokenIdNum(num);
  }

  // 2. IPFS에 이미지 업로드
  const uploadImg = async () => {
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const resp = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", fileData, {
        // 업로드 권한 인증
        headers : {  
          "Content-Type" : "multipart/form-data",
          "Accept" : "application/json",
          pinata_api_key : "0d1136c2636273b7066c",
          pinata_secret_api_key : "6ea8f3da99e0ecfb2ddb320d43bf3089d1e910dd354a1275aca35730ce97d139"
        }
      });
      console.log(resp.data.IpfsHash);
      setImageHash(resp.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  }

  // 3. 민팅
  const mintNFT = async () => {
    const result = await contract.methods.minting(tokenIdNum, imageHash).send({
      from : user.account
    })
    console.log(result);
    setIsMint(result);
  }

  // 객체 만들어서 IPFS에 업로드
  const uploadJson = async () => {
    const makeTokenURI = await contract.methods.tokenURI(tokenIdNum).call({
      from : user.account
    })
    console.log(makeTokenURI);
    const jsonData = {
      "name" : name,
      "description" : description,
      "image" : makeTokenURI,
      "attributes" : []
    }
    console.log(jsonData)

    // fetch('./NFT', {
    //   method : 'POST',
    //   headers : {
    //     'Content-Type' : 'application/son'
    //   },
    //   body : JSON.stringify(jsonData)
    // })
    // .then(response => response.json())
    // .then(dd => console.log(dd))
    // .catch(error => console.log(error))

    // const resp = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    //   // 업로드 권한 인증
    //   headers : {  
    //     "Content-Type" : "multipart/form-data",
    //     "Accept" : "application/json",
    //     pinata_api_key : "0d1136c2636273b7066c",
    //     pinata_secret_api_key : "6ea8f3da99e0ecfb2ddb320d43bf3089d1e910dd354a1275aca35730ce97d139"
    //   }
    // });
    // console.log(resp);
  }


  return (
    <>
    <div id='container'>
      <label>토큰 아이디 : {tokenIdNum}</label>
      <button onClick={getTokenId}>요청</button>


      <label>NFT 이미지 (hash : {imageHash})</label>
      <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
      <button onClick={() => {uploadImg()}}>이미지 업로드</button>


      <label>NFT 이름</label>
      <input onChange={(e) => {setName(e.target.value)}}></input>
      <label>NFT 설명</label>
      <input onChange={(e) => {setDescription(e.target.value)}}></input>
      <button onClick={() => {uploadJson()}}>json 업로드</button>

      <label>민팅하기</label>
      {isMint &&
        <div>성공</div>
      }
      <button onClick={() => {mintNFT()}}>민팅</button>

    </div>
    </>
  )
}

export default App;

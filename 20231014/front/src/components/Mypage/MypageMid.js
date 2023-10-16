import React, { useState, useEffect } from 'react'

import useWeb3 from '../../hook/web3.hook'
import abi from '../../abi/Store.json'

import { MypageMidBox, MypageGoodsBox, ImgBox } from './Mypage.styled'

const MypageMid = () => {
    const {user, web3} = useWeb3();

    const [contract, setContract] = useState(null);
    const [goods, setGoods] = useState([]);
  
    useEffect(() => {
        if(web3 !== null) {
            if(contract) return;
            const pokContract = new web3.eth.Contract(abi, "0xE044c7BfD0aB696Cca1798ab4CbAF43bd7eEaE8b", {data : ""});
            setContract(pokContract);
        }
    }, [web3]);
  
    const getMypageGoods = async () => {
        const result = await contract.methods.mypageGoods().call({
          from : user.account
        })
        console.log(result);
        setGoods(result);
    }
  
    useEffect(() => {
        if(!contract) return;
        getMypageGoods();
    }, [contract]);

    return (
        <>
        <MypageMidBox>
            {/* {goods.map((item, index) => {
                console.log(item);
                return (
                    <MypageGoodsBox key={index}>
                        <img src={item.url}></img>
                        <div>{item.name}</div>
                    </MypageGoodsBox>
                )
            })} */}
            <MypageGoodsBox>
                <ImgBox backImg={'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'}></ImgBox>
                <div>어쩌구</div>
                <div>얼마</div>
            </MypageGoodsBox>
            <MypageGoodsBox>
                <ImgBox backImg={'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'}></ImgBox>
                <div>어쩌구</div>
                <div>얼마</div>
            </MypageGoodsBox>
            <MypageGoodsBox>
                <ImgBox backImg={'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'}></ImgBox>
                <div>어쩌구</div>
                <div>얼마</div>
            </MypageGoodsBox>
            <MypageGoodsBox>
                <ImgBox backImg={'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'}></ImgBox>
                <div>어쩌구</div>
                <div>얼마</div>
            </MypageGoodsBox>
            <MypageGoodsBox>
                <ImgBox backImg={'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg'}></ImgBox>
                <div>어쩌구</div>
                <div>얼마</div>
            </MypageGoodsBox>
        </MypageMidBox>
        </>
    )
}

export default MypageMid

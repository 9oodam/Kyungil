import React, { useState, useEffect } from 'react'

import useWeb3 from '../../hook/web3.hook';
import abi from '../../abi/Store.json'

import { InputBox, RegisterBottomBox, RegisterMidBox } from './Register.styled'

const RegisterMid = () => {
    const {user, web3} = useWeb3();

    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState("");

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [myGoods, setMyGoods] = useState([]);

  
    useEffect(() => {
        if(web3 !== null) {
            if(contract) return;
            const pokContract = new web3.eth.Contract(abi, "0xE044c7BfD0aB696Cca1798ab4CbAF43bd7eEaE8b", {data : ""});
            setContract(pokContract);
        }
    }, [web3]);

    // 내가 등록한 상품 배열 가져오기
    const getMyGoods = async () => {
        console.log(user.account)
        const result = await contract.methods.showMyGoods().call({
            from : user.account
        })
        console.log(result);
        setMyGoods(result);
    }
  
    const tryRegister = async () => {
        console.log(name, price);
        // 비어있으면 return

        // 이미지가 없으면 return

        // 이름이 영어가 아니면 return

        // 가격이 숫자가 아니면 return

        // 최종
        await contract.methods.registerGoods('', name, price).send({
            from : user.account
        });
        getMyGoods();
    }

    useEffect(() => {
        if(!contract) return;
        getMyGoods();
    }, [contract]);

    return (
        <>
        <RegisterMidBox>
            <InputBox>
                <label>상품 이미지</label>
                <input type='file'></input>
                <label onChange={(e) => setName(e.target.value)}>상품 이름 (in English)</label>
                <input></input>
                <label onChange={(e) => setPrice(e.target.value)}>상품 가격 (DAM)</label>
                <input></input>
                <div onClick={tryRegister}>등록</div>
            </InputBox>

            <RegisterBottomBox>
                <label>내가 등록한 상품</label>
            </RegisterBottomBox>
        </RegisterMidBox>
        </>
    )
}

export default RegisterMid

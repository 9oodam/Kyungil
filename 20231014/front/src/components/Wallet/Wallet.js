import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useWeb3 from '../../hook/web3.hook';
import abi from '../../abi/Store.json'

import { WalletAccount, WalletBox, WalletToken } from './Wallet.styled'
import wallet from '../imgs/wallet.png';

const Wallet = () => {
    const nav = useNavigate();

    const {user, web3} = useWeb3();

    const [contract, setContract] = useState(null);
    const [token, setToken] = useState("0");
    const [account, setAccount] = useState("");

    useEffect(() => {
        if(web3 !== null) {
            if(contract) return;
            const pokContract = new web3.eth.Contract(abi, "0xE044c7BfD0aB696Cca1798ab4CbAF43bd7eEaE8b", {data : ""});
            setContract(pokContract);
        }
    }, [web3]);

    const getMyAccount = async () => {
        const account = await window.ethereum.request({method : 'eth_requestAccounts'});
        const token = await web3.utils.fromWei(web3.utils.toBigInt(await contract.methods.balanceOf(account[0]).call()).toString(10), "ether");
        setAccount(user.account);
        setToken(Number(token).toFixed(1));
    }

    useEffect(() => {
        if(!contract) return;
        getMyAccount();
    }, [contract]);


    if(user.account == null) nav('/login');

    return (
        <>
        <WalletBox>
            <WalletAccount>
                <img src={wallet}></img>
                {account}
            </WalletAccount>
            <WalletToken>
                {token}<span>DAM</span>
            </WalletToken>
        </WalletBox>
        </>
    )
}

export default Wallet

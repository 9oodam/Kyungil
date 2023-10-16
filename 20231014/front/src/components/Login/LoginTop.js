import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkUser, resetUser } from '../../redux/features/login';

import { LoginButton, LoginText } from './Login.styled';

import metamask from "../imgs/metamask.png";

const LoginTop = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const {user_account} = useSelector((state) => state.loginUser);

    // 현재 연결 되어있는 지갑 계정 불러와서 전역 저장소에 저장
    const tryLogin = () => {
        console.log('지갑 연결 시도')
        if(window.ethereum) {
            window.ethereum.request({method : 'eth_requestAccounts'}).then(async (data) => {
                console.log(data[0]);
                dispatch(checkUser(data[0]));
            })
        }else {
            alert("메타마스크에서 지갑을 먼저 연결하세요.")
        }
    }

    // 전역 저장소에 계정 입력된 것 확인되면 메인 페이지로 이동
    useEffect(() => {
        console.log(user_account);
        if(user_account !== '') {
            nav('/');
        }
    }, [user_account]);

    // 최초실행
    useEffect(() => {
        dispatch(resetUser());
    }, []);

    return (
        <>
        <LoginText>
            <span>LOGIN</span>with
        </LoginText>
        <LoginButton onClick={tryLogin}>
            <img src={metamask}></img>
        </LoginButton>
        </>
    )
}

export default LoginTop

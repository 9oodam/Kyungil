import styled from 'styled-components';

export const WalletBox = styled.div`
    width: 470px; height: 100px;
    position: fixed; bottom: 60px;
    background-color: #ff9500;
    display: flex; flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
`

export const WalletAccount = styled.div`
    width: 100%; height: 13px;
    font-size: 12px;
    display: flex; align-items: center;

    & img {
        height: 100%;
        margin: 0 5px 0 0;
    }
`

export const WalletToken = styled.div`
    width: 100%; height: 70px;
    font-size: 30px; font-weight: bold;
    display: flex; align-items: center;

    & span {
        font-size: 20px;
        margin: 0 0 0 10px;
    }
`
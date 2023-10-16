import styled from 'styled-components';

export const LoginText = styled.div`
    width: 300px; height: auto;
    position: absolute;
    top: 40%; left: 50%;
    transform: translateX(-50%);
    display: flex; justify-content: center; align-items: center;
    font-size: 14px;
    color: #ff9500;

    & span {
        font-size: 30px;
        font-weight: bold;
        margin: 0 5px 0 0;
    }
`

export const LoginButton = styled.div`
    width: 300px; height: 80px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #FFA500;
    display: flex; justify-content: center; align-items: center;
    cursor: pointer;
    position: absolute;
    top: 45%; left: 50%;
    transform: translateX(-50%);

    &:hover {
        background-color: #ff9500;
    }
    & img {
        width: 100%;
    }
`
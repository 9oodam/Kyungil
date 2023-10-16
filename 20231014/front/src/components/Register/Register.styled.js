import styled from 'styled-components';

export const RegisterTopBox = styled.div`
    width: 100%; height: 80px;
    display: flex; justify-content: center; align-items: center;
    font-size: 30px; font-weight: bold;
`

export const RegisterMidBox = styled.div`
    width: 100%; height: 280px;

    &::-webkit-scrollbar {
        display: none;
    }
`
export const InputBox = styled.div`
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    padding: 10px;
    box-sizing: border-box;

    & label {
        font-weight: bold;
    }
    & input {
        height: 30px;
        margin: 0 0 15px 0;
    }
    & div {
        width: 50px; height: 30px;
        font-weight: bold;
        border-radius: 5px; 
        background-color: #ff9500;
        display: flex; justify-content: center; align-items: center;
        cursor: pointer;
    }
`


export const RegisterBottomBox = styled.div`
    width: 100%; height: calc(100vh - 540px);
    /* display: flex; flex-direction: row;
    flex-wrap: wrap; */
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    & label {
        height: 30px;
        padding: 10px;
        box-sizing: border-box;
        font-weight: bold;
    }
`
import styled from 'styled-components'

export const LoginBoxWrap = styled.div`
    width: 100vw; height: 100vh;
    display: flex; flex-direction: row;
    justify-content: center; align-items: center;
    border : 3px solid;
`

export const Box = styled.div`
    width: 300px; height: 300px;
    border: 1px solid;
    padding: 30px;
    box-sizing: border-box;
    margin: 30px;

    & div {
        width: 100%;
        font-size: 30px;
        margin: 20px 0 20px 0;
    }

    & input {
        width: 100%;
    }
`

export const Label = styled.div`
    width: 100%; height: 30px;
    border: 1px solid;
    margin: 20px 0 0 0;
    text-align: start;
`
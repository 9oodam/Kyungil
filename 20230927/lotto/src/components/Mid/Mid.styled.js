import styled from 'styled-components'

export const MidBox = styled.div`
    width: 620px; height: 50px;
    display: flex; flex-wrap: wrap;
    justify-content: center; align-items: center;
`

export const Btn = styled.div`
    width: 50px; height: 30px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    display: flex; justify-content: center; align-items: center;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background-color: white;
        color: black;
    }
`
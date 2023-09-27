import styled from 'styled-components'

export const BottomBox = styled.div`
    width: 620px; height: 300px;
    border: 1px solid white;
    border-radius: 15px;
    display: flex;
`

export const BoxForSix = styled.div`
    width: 70%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
`

export const BoxForBonus = styled.div`
    width: 30%; height: 100%;
    display: flex; justify-content: center; align-items: center;
`

export const BigBall = styled.div`
    width: 90px; height: 90px;
    border: 1px solid white;
    border-radius: 100%;
    color: ${(props) => props.col || 'white'};
    background-color: ${(props) => props.backCol || 'black'};
    display: flex; justify-content: center; align-items: center;
    font-size: 24px;
    margin: 15px;
`
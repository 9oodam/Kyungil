import styled from 'styled-components'

export const Subject = styled.div`
    width: auto; height: 100px;
    color: white;
    font-size: 40px;
    cursor: pointer;

    &:hover {
        font-size: 45px;
    }
`

export const TopBox = styled.div`
    width: 620px; height: 320px;
    border: 1px solid white;
    border-radius: 25px;
    padding: 5px;
    display: flex; flex-wrap: wrap;
`

export const MiniBall = styled.div`
    width: 50px; height: 50px;
    border: 1px solid white;
    color: white;
    border-radius: 100%;
    margin: 5px;
    display: flex; justify-content: center; align-items: center;
`
import styled from 'styled-components';

export const NavBox = styled.div`
    width: 470px; height: 60px;
    position: fixed; bottom: 0;
    display: flex;
`

export const NavButton = styled.div`
    font-size: 16px;
    border: 2px solid #ff9500;
    width: 157px; height: 100%;
    box-sizing: border-box;
    display: flex; justify-content: center; align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #ff9500;
    }
`
import styled from 'styled-components';

export const MypageTopBox = styled.div`
    width: 100%; height: 80px;
    display: flex; justify-content: center; align-items: center;
    font-size: 30px; font-weight: bold;
`

export const MypageMidBox = styled.div`
    width: 100%; height: calc(100vh - 240px);
    display: flex; flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
`
export const MypageGoodsBox = styled.div`
    width: 50%; height: 260px;
    border: 1px solid;
    display: flex; flex-direction: column;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`
export const ImgBox = styled.div`
    width: 100%; height: 200px;
    border: 1px solid;
    overflow: hidden;
    background-image: url(${(props) => props.backImg || ''});
    background-size: cover;
    margin: 0 0 10px 0;
`
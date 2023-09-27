import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TopBox, MiniBall } from './Top.styled';

const Top = () => {
    const {prevBall} = useSelector((state) => {return state.setPrevBalls});

    return (
        <>
        <TopBox>
            {prevBall.map((num, index) => {
                return <MiniBall key={index}>{num}</MiniBall>
            })}
        </TopBox>
        </>
    )
}

export default Top

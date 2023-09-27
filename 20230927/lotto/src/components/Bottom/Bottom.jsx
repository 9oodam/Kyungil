import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { BottomBox, BigBall, BoxForSix, BoxForBonus } from './Bottom.styled'

const Bottom = () => {
  const {postBall, bonusBall} = useSelector((state) => {return state.setPostBalls});
  const [bonus, setBonus] = useState(false);

  useEffect(() => {
    console.log(typeof(bonusBall))
    if(typeof(bonusBall) === 'number') {
      setBonus(true)
    }else {
      setBonus(false)
    }
  }, [bonusBall])

  return (
    <>
      <BottomBox>
        <BoxForSix>
          {postBall.map((num, index) => {
              return <BigBall key={index}>{num}</BigBall>
          })}
        </BoxForSix>
        <BoxForBonus>
          {bonus &&
            <BigBall backCol={'white'} col={'black'}>{bonusBall}</BigBall>
          }
        </BoxForBonus>
      </BottomBox>
    </>
  )
}

export default Bottom

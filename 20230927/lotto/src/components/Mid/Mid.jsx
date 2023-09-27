import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { changePrev } from '../../redux/features/setPrev';
import { setPost, setBonus } from '../../redux/features/setPost';

import { MidBox, Btn } from './Mid.styled'

const Mid = () => {
  const dispatch = useDispatch();

  const {prevBall, bonusBall} = useSelector((state) => {return state.setPrevBalls});

  const pushBtn = () => {
    console.log(prevBall)
    if(prevBall.length > 39) {
      let randomIndex = Math.floor(Math.random() * prevBall.length * 1);
      let randomNum = prevBall[randomIndex];
      console.log(randomNum);
      dispatch(changePrev(randomNum));
      dispatch(setPost(randomNum));
    }else {
      alert('Restart the game')
    }
  }

  const bonusBtn = () => {
    if(prevBall.length < 39) {
      alert('Restart the game')
    }else if(prevBall.length <= 39 && bonusBall == undefined) {
      let randomIndex = Math.floor(Math.random() * prevBall.length * 1);
      let randomNum = prevBall[randomIndex];
      console.log(randomNum);
      dispatch(changePrev(randomNum));
      dispatch(setBonus(randomNum));
    }else {
      alert('Get the 6 balls first')
    } 
  }

  return (
    <>
      <MidBox>
        <Btn onClick={pushBtn}>Push</Btn>
        <Btn onClick={bonusBtn}>Bonus</Btn>
      </MidBox>
    </>
  )
}

export default Mid

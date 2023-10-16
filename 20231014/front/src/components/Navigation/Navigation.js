import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBox, NavButton } from './Navigation.styled'

const Navigation = () => {
  const nav = useNavigate();

  return (
    <>
        <NavBox>
            <NavButton onClick={() => nav('/')}>상점</NavButton>
            <NavButton onClick={() => nav('/register')}>등록</NavButton>
            <NavButton onClick={() => nav('/mypage')}>마이페이지</NavButton>
        </NavBox>
    </>
  )
}

export default Navigation

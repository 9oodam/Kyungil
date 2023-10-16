import React from 'react'

import Navigation from '../components/Navigation/Navigation'
import Wallet from '../components/Wallet/Wallet'
import MypageTop from '../components/Mypage/MypageTop'
import MypageMid from '../components/Mypage/MypageMid'


const Mypage = () => {

  return (
    <>
      <MypageTop />
      <MypageMid />

      <Wallet />
      <Navigation />
    </>
  )
}

export default Mypage

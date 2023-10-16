import React from 'react'
import RegisterTop from '../components/Register/RegisterTop'
import Navigation from '../components/Navigation/Navigation'
import Wallet from '../components/Wallet/Wallet'
import RegisterMid from '../components/Register/RegisterMid'

const Register = () => {


  return (
    <>
      <RegisterTop />
      <RegisterMid />

      <Wallet />
      <Navigation />
    </>
  )
}

export default Register

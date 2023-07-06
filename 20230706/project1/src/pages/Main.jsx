import React from 'react'
import {Body, Header} from '../components'

const Main = ({login}) => {
  return (
    <div>
        <Header name={'Main'}></Header>

        <Body path={'/shop'} name={'Shop'} login={login} />
        <Body path={'/login'} name={'Login'} login={login} />

        <Body path={'/mypage'} name={'MyPage'} login={login} />
    </div>
  )
}

export default Main

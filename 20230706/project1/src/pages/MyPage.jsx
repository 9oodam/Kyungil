import React from 'react'
import {Body, Header} from '../components'

const MyPage = () => {
  return (
    <div>
      <Header name={'MyPage'}></Header>
      <Body path={'/'} name={'Main'} />
    </div>
  )
}

export default MyPage

import React from 'react'
import Container from '../components/Container'

const Main = ({list, setList}) => {
  return (
    <div className='main'>
      <Container list={list} setList={setList} />
    </div>
  )
}

export default Main

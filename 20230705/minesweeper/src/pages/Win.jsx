import React from 'react'
import { Link } from 'react-router-dom'

const Win = () => {
  return (
    <div className='lose'>
        <p>You Win!</p>
        <Link to={"/"}>Replay</Link>
    </div>
  )
}

export default Win
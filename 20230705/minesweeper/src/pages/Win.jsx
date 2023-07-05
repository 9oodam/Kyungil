import React from 'react'
import { Link } from 'react-router-dom'

const Win = () => {
  return (
    <div>
        You Win!
        <Link to={"/"}>Replay</Link>
    </div>
  )
}

export default Win
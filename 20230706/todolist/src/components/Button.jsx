import React from 'react'

const Button = ({btn}) => {
    let border, color;
    if(btn == "Submit") {
        border = "3px solid rgb(0, 160, 160)";
        color = "rgb(0, 160, 160";
    }else if(btn == "X") {
      border = "2px solid rgb(255, 56, 86";
      color = "rgb(255, 56, 86";
    }
    else {
        border = "3px solid rgb(255, 56, 86)";
        color = "rgb(255, 56, 86";
    }
  return (
    <div className='btn' style={{border: border, color: color}}>
      {btn}
    </div>
  )
}

export default Button

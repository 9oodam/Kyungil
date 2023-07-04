import React, {useState, useEffect} from 'react'

const Title = ({isActiveC, activeC, isActiveL, activeL}) => {
    return (
        <div className="title">
            <div className="yearmonth">
                <h1>2023</h1>
                <p>JULY</p>
            </div>
            <div className="btns">
                <Buttons isActiveC={isActiveC} activeC={activeC} btn={"Color Mark"}/>
                <Buttons isActiveL={isActiveL} activeL={activeL} btn={"Lunar"}/>
            </div>
        </div>
    )
}

const Buttons = ({isActiveC, activeC, isActiveL, activeL, btn}) => {    
    let isActive;
    if(btn == "Color Mark") {
        isActive = isActiveC;
    }else {
        isActive = isActiveL;
    }

    return (
        <>
        <div className="btn" onClick={isActive}>
            <div>{btn}</div>
            <div>{activeC}{activeL}</div>
        </div>
        </>
    )
}

const Days = ({day}) => {
    let color;
    if(day == "SUN") {
        color = "rgb(254, 70, 70)"
    }else if(day == "SAT") {
        color = "rgb(52, 128, 242)"
    }

    return (
        <div className="day">
            <p style={{color : color}}>{day}</p>
        </div>
    )
}


const Top = ({isActiveC, activeC, isActiveL, activeL}) => {
  return (
    <div>
      <Title isActiveC={isActiveC} activeC={activeC} isActiveL={isActiveL} activeL={activeL} />
      <div className="days">
        <Days day={"SUN"}/>
        <Days day={"MON"}/>
        <Days day={"TUE"}/>
        <Days day={"WED"}/>
        <Days day={"THU"}/>
        <Days day={"FRI"}/>
        <Days day={"SAT"}/>
      </div>
    </div>
  )
}



export default Top

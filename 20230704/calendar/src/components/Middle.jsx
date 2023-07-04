import React from "react";

const Middle = ({ activeC, activeL }) => {
    let num = [];
    for (let i = 0; i < 31; i++) {
        num.push(i + 1);
    }

    let num2 = [];
    if (activeL == "on") {
        for (let i = 0; i < 31; i++) {
            if(i < 18) {
                num2.push(`5.${i + 14}`);
            }else {
                num2.push(`6.${i-17}`);
            }
        }
    } else {
        num2 = [];
    }

  return (
    <div className="date-container">
        <Date />
        <Date />
        <Date />
        <Date />
        <Date />
        <Date />
        {num.map((value, index) => {
            let color;
            if(activeC == "on") {
                if(index==0 || index%7==0) {
                    color = "blue";
                }else if(index==1 || index%7==1) {
                    color = "red";
                }else {
                    color = "black";
                }
            }
            return <Date key={index} num={value} num2={num2[index]} color={color} />;
        })}
    </div>
  );

  /*
    return (
        <div className="date-container">
            <Date color={redDate}/>
            <Date />
            <Date />
            <Date />
            <Date />
            <Date />
            <Date num={1} color={blueDate}/>

            <Date num={2} num2={"5.15"} color={redDate}/>
            <Date num={3}/>
            <Date num={4}/>
            <Date num={5}/>
            <Date num={6}/>
            <Date num={7}/>
            <Date num={8} color={blueDate}/>

            <Date num={9} color={redDate}/>
            <Date num={10}/>
            <Date num={11}/>
            <Date num={12}/>
            <Date num={13}/>
            <Date num={14}/>
            <Date num={15} color={blueDate}/>

            <Date num={16} color={redDate}/>
            <Date num={17}/>
            <Date num={18}/>
            <Date num={19}/>
            <Date num={20}/>
            <Date num={21}/>
            <Date num={21} color={blueDate}/>

            <Date num={22} color={redDate}/>
            <Date num={23}/>
            <Date num={24}/>
            <Date num={26}/>
            <Date num={26}/>
            <Date num={27}/>
            <Date num={28} color={blueDate}/>

            <Date num={29} color={redDate}/>
            <Date num={30}/>
            <Date num={31}/>
            <Date />
            <Date />
            <Date />
            <Date />
        </div>
    )
    */
};

const Ribbon = ({ color }) => {
  if(color == "black") {
    color = "rgba(0, 0, 0, 0)"
  }else if(color == "red") {
    color = "rgb(254, 70, 70)";
  } else if (color == "blue") {
    color = "rgb(52, 128, 242)";
  }

  return <div className="ribbon" style={{ backgroundColor: color }}></div>;
};

const Date = ({ num, num2, color }) => {
  if (color == "red") {
    color = "rgb(254, 70, 70)";
  } else if (color == "blue") {
    color = "rgb(52, 128, 242)";
  }

  function clickHandler() {
    console.log("click");
  }

  return (
    <div className="date">
      <Ribbon color={color} />
      <p style={{ color: color }} onClick={clickHandler}>
        {num}
      </p>
      <p className="lunar">
        {num2}
      </p>
    </div>
  );
};

export default Middle;

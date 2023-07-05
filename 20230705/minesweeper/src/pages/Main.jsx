import { Link, Route, Routes } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { bomb, flag } from '../img';


const BlockInside = ({result}) => {
    let img;
    if(result == "bomb") {
        img = bomb;
    }else if(result == "flag") {
        img = flag;
    }

    return (
        <img src={img} alt="" />
    )
}

const Block = ({value, index, victory, setVictory}) => {
    // 클릭했을 때 다시 선택 못하게
    const [isClick, setClick] = useState(false);
    function clickHandler() {
        if(isClick == false) {
            setClick(true);
        };
    }

    // 클릭한 블록이 지뢰면 value == 1, 아니면 value == 0
    const [result, setResult] = useState();
    useEffect(() => {
        //console.log(result);
    }, [result]);

    useEffect(() => {
        //console.log(index, "번 클릭 됐나요? : ", isClick);
        if(isClick == true) {
            let clicked = document.querySelectorAll(".block");
            clicked[index].classList.add('clicked');

            if(value == 1) {
                setResult("bomb");
                
                // 다 터뜨리고 실패로 넘어가기
                for (let i = 0; i < 25; i++) {
                    setTimeout((index) => {
                      //console.log(index);
                      clicked[index].click();
                    }, i * 100, i);
                }

                setInterval(() => {
                    window.location.href = '/lose';
                }, 3000);
            }else if(value == 0) {
                setResult("flag");

                // flag가 20개 되면 승리로 넘어가기
                setVictory(victory+1);
            }
        }
    }, [isClick])

    return (
        <div className='block' onClick={clickHandler}>
            <BlockInside result={result} />
        </div>
    )
}

const Field = () => {
    // block 25개 만들기
    let blocks = [];
    for(let i=0; i<25; i++) {
        blocks.push(0);
    }

    // 깃발 카운트 (20개 넘어가면 승리)
    const [victory, setVictory] = useState(0);
    // 상위 컴포넌트에서 만든 상태값을 하위 컴포넌트에서 수정하니 함수가 실행될 때마다 상위 컴포넌트가 새로 실행...
    // 랜덤 값이 매번 바뀜

    useEffect(() => {
        //console.log("flag count : ", victory);
        if(victory >= 20) {
            setInterval(() => {
                window.location.href = '/win';
            }, 3100);
        }
    }, [victory]);

    // 랜덤 (20% 확률로 지뢰)
    for(let i=0; i<5; i++) {
        const random = Math.floor(Math.random() * blocks.length);
        blocks[random] = 1;
    }
    //console.log(blocks);

    return (
        <div className='field'>
            {blocks.map((value, index) => {
                return <Block key={index} value={value} index={index} victory={victory} setVictory={setVictory} />
            })}
        </div>
    )
}

const Main = () => {

    return (
        <div className="container">
            <Field />
        </div>
    )
}

export default Main
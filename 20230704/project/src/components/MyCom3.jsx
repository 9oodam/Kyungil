// 화살표 함수형 컴포넌트 (rafce)
    // rafce : react arrow function component export
// 실제로는 함수형 컴포넌트를 대부분 사용
// 다만 함수형 컴포넌트 만들어지기 이전 클래스형 컴포넌트로 만들어진 코드를 볼 줄 알아야함

// state, props 관리 어떻게?
// state : react hook -> useState (상태값을 만들고 수정할 때 사용할 메서드), useEffect (라이프사이클)
// props : 함수형 컴포넌트의 매개변수로 props를 받음

// 클래스형 컴포넌트에서는 state를 수정할 때 한 개씩 나눠서 관리할 수 없었음
// this.state = {a : a, b : b}
// 함수형 컴포넌트에서는 한 개씩 나눠서 관리 가능


import React, {useState, useEffect} from 'react'

const MyCom3 = ({number, number2, number3}) => {
    console.log(number, number2, number3); // props

    let count = 0;

    // react 안에서 useState() 가져옴
    // useState(상태변수, 상태변수를 업데이트 할 setState 함수)
        // 매개변수로 전달한 값이 초기값
        // setNum()을 사용해서 num 변경
    const [num, setNum] = useState(0);
    const [active, setActive] = useState(false);

    // useEffect(함수, 배열)
    // 함수로 배열에 전달한 상태값을 확인하고 실행
        // [] == componentDidMount()
        // [num] == componentDidMount() + componentDidUpdate()
    useEffect(() => {
        console.log("최초 생성, 상태 변화")
        console.log("num : ", num) // 상태값 변화 후 사용하는 곳
    }, [num])
    useEffect(() => {
        console.log("상태 : ", active)
    }, [active])
    useEffect(() => {
        console.log("여러가지 다") // 둘 중 하나라도 업데이트 되면 함수 실행
    }, [num, active]);

    function clickHandler() {
        console.log("click");

        // 이전의 상태값이 보관되어 값이 유지됨
        setNum(num + 1); // 상태 변경
        console.log("num : ", num); // 상태값을 변경하자마자 사용하면 이전 값이 나오기 때문에 사용하면 안됨

        // 바깥에 선언해둔 초기값으로 리렌더링
        count++;
        console.log("count : ", count);
    }

    function activeHandler() {
        setActive(!active); // true <-> false
    }

    return (
        <div>
            <button onClick={clickHandler}>클릭</button>
            <button onClick={activeHandler}>활성화/비활성화</button>
        </div>
    )
}

export default MyCom3


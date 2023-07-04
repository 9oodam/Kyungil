import {Component} from "react";

class MyCom extends Component {
    // 컴포넌트의 구조는 같은데 내용이 다른 경우 props라는 값을 받아서 사용
    constructor(props) {
        super(props); // super를 통해 부모의 생성자 함수를 호출 해줘야 this를 사용할 수 있음
        this.state = {
            num : 0
        }
    }
    
    // 컴포넌트가 초기에 생성되면 constructor() -> render() -> componentDidMount() 순으로 실행
    componentDidMount() {
        console.log("MyCom 생성");
    }

    // 컴포넌트의 상태가 변화되면 상태 변환 후 componentDidUpdate() 실행
    componentDidUpdate() {
        console.log("MyCom 상태변환 ", this.props.name);
    }

    render() {
        return(
            <div className={"com " + this.props.cName}>
                {this.props.name}
                <button onClick={() =>
                    {this.setState({...this.state, num : this.state.num++})
                }}>
                    state change
                </button>
            </div>
        )
    }
}

class MyCom2 extends Component {
    render() {
        return(
            <div>
                This is My Component2.
            </div>
        )
    }
}

export {MyCom, MyCom2};
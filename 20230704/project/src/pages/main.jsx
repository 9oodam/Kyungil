/*
import {Component} from "react";
import {MyCom, MyCom2} from "../components/MyCom";

export default class Main extends Component {
    render() {
        return(
            <>
                Main Page<br></br>
                <MyCom name="First Component" cName="red"/>
                <MyCom name="Second Component" cName="blue"/>
                <MyCom2 />
            </>
        )
    }
}
*/

import {Component} from "react";
import MyCom3 from "../components/MyCom3";

export default class Main extends Component {
    render() {
        return(
            <>
                Main Page<br></br>
                <MyCom3 number={1} number2={2} number3={3} />
            </>
        )
    }
}
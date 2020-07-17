import React, {useState} from "react";
import "./Exam.css"
import {Btn} from "./Btn";
import {Counter} from "./Counter";


export function Exam() {
    let [counter, setCounter] = useState(0)

    function inc() {
        setCounter(counter + 1)
    }

    function reset() {
        setCounter(0)
    }

    return (
        <div className="mainContainer">
            <Counter counter={counter}/>
            <div className="btn">
                <Btn
                    name="inc"
                     className="inc"
                     onClick={inc}
                     disabled={counter === 5}/>
                <Btn
                    name="reset"
                    className="reset"
                    onClick={reset}
                    disabled={counter === 0} />
            </div>
        </div>
    )
}


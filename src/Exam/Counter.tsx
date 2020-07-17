import React from "react";

type CounterType={counter:number}

export function Counter(props:CounterType) {
    return (
        <div
            className={props.counter !== 5 ? "counter" : "red counter"}>
            {props.counter}
        </div>
    )
}
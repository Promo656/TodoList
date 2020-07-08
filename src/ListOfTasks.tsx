import React from "react";
import {TaskType} from "./App";
import {PropsType} from "./TestApp";


export function ListOfTasks(props: PropsType) {
    return (
        <div>
            <h1>{props.title}</h1>
            <input type="text" checked={false}/>
            <button>+</button>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => {

                                {
                                    props.removeTask(t.id)
                                }
                            }}>X
                            </button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>

                        </li>
                    )
                })}
            </ul>
            <button onClick={()=>{props.changeFilter("all")}}>All</button>
            <button onClick={()=>{props.changeFilter("active")}}>Active</button>
            <button onClick={()=>{props.changeFilter("completed")}}>Complited</button>
        </div>
    );
}
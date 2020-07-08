import React, {useState} from "react";
import {TaskType} from "./App";
import {PropsType} from "./TestApp";


export function ListOfTasks(props: PropsType) {
    let [title, setTitle] = useState("")
    let addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    return (
        <div>
            <h1>{props.title}</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
                onKeyPress={(e) => {
                    if (e.charCode === 13) {
                        addTask()
                    }
                }}
            />
            <button onClick={addTask}>+</button>
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
            <button onClick={() => {
                props.changeFilter("all")
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>Complited
            </button>
        </div>
    );
}
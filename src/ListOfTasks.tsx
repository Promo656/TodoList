import React, {useState} from "react";
import {FilterValueTYpe, TaskType} from "./TestApp";

type PropsType = {
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    changeFilter: (value: FilterValueTYpe) => void
    addTask: (title: string) => void
}

export function ListOfTasks(props: PropsType) {
    let [title, setTitle] = useState("")

    function addTasks() {
        props.addTask(title)
        setTitle("")
    }

    return (
        <div>
            <h1> Main tasks</h1>
            <input
                type="text"
                onChange={(event => {
                    setTitle(event.currentTarget.value)
                })}/>
            <button onClick={addTasks}>Add</button>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTasks(t.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => props.changeFilter("all")}>All</button>
            <button onClick={() => props.changeFilter("active")}>Active</button>
            <button onClick={() => props.changeFilter("complited")}>Complited</button>
        </div>
    )
}
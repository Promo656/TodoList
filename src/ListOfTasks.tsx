import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueTYpe, TaskType} from "./TestApp";

type PropsType = {
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    changeFilter: (value: FilterValueTYpe) => void
    addTask: (title: string) => void
    changeIsDoneStatus: (id: string, isDone: boolean) => void
}

export function ListOfTasks(props: PropsType) {
    let [title, setTitle] = useState("")

    let addTasks = () => {
        props.addTask(title)
        setTitle("")
    }

    let takeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let useEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTasks()
        }
    }

    let changeFiltertoAll = () => {
        props.changeFilter("all")
    }
    let changeFiltertoActive = () => {
        props.changeFilter("active")
    }
    let changeFiltertoComplited = () => {
        props.changeFilter("complited")
    }

    return (
        <div>
            <h1> Main tasks</h1>
            <input
                type="text"
                onChange={takeValue}
                value={title}
                onKeyPress={useEnter}/>
            <button onClick={addTasks}>Add</button>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => props.removeTasks(t.id)
                    let changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneStatus = e.currentTarget.checked
                        props.changeIsDoneStatus(t.id, newIsDoneStatus)
                    }


                    return (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={changeFiltertoAll}>All</button>
            <button onClick={changeFiltertoActive}>Active</button>
            <button onClick={changeFiltertoComplited}>Complited</button>
        </div>
    )
}
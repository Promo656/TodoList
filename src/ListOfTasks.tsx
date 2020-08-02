import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {PropsType, TaskType} from "./TestApp";
import "./App.css"


export function ListOfTasks(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    let addTasks = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    let removeTodoList=()=>{
        props.removeTodoList(props.id)
    }

    let takeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let useEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTasks()
        }
    }

    let changeFiltertoAll = () => {
        props.changeFilter("all", props.id)
    }
    let changeFiltertoActive = () => {
        props.changeFilter("active", props.id)
    }
    let changeFiltertoComplited = () => {
        props.changeFilter("complited", props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <button onClick={removeTodoList}>X</button>
                <input
                    type="text"
                    onChange={takeValue}
                    value={title}
                    onKeyPress={useEnter}

                />
                <button onClick={addTasks}>Add</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => props.removeTasks(t.id, props.id)
                    let changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneStatus = e.currentTarget.checked
                        props.changeIsDoneStatus(t.id, newIsDoneStatus, props.id)
                    }

                    return (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatus}
                                className={t.isDone === true ? "is-done" : ""}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    )
                })}
            </ul>
            <button className={props.filter === "all" ? "active" : ""} onClick={changeFiltertoAll}>All</button>
            <button className={props.filter === "active" ? "active" : ""} onClick={changeFiltertoActive}>Active</button>
            <button className={props.filter === "complited" ? "active" : ""}
                    onClick={changeFiltertoComplited}>Complited
            </button>
        </div>
    )
}
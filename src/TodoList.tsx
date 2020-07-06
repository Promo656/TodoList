import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TodoListPropsType} from "./App";

export function TodoList(props: TodoListPropsType) {

    let [taskName, setTaskName] = useState("")

    function addTask() {
        props.addTasks(taskName)
        setTaskName("")
    }

    function onTaskNameChange(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value)
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    function onAllClickHandler() {
        props.changeFilter("all")
    }

    function onActiveClickHandler() {
        props.changeFilter("active")
    }

    function onComplitedClickHandler() {
        props.changeFilter("complited")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskName}
                    onChange={onTaskNameChange}
                    onKeyPress={onAddTaskKeyPressed}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onComplitedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TodoListPropsType} from "./App";

export function TodoList(props: TodoListPropsType) {

    let [taskName, setTaskName] = useState("")
    let [error, setError] = useState<string | null>(null)

    function addTask() {
        if (taskName.trim()) {
            props.addTasks(taskName.trim(), props.id)
            setTaskName("")
        } else {
            setError("Title is required")
        }
    }

    function onTaskNameChange(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value)
        setError(null)
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    function onAllClickHandler() {
        props.changeFilter("all", props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter("active", props.id)
    }

    function onComplitedClickHandler() {
        props.changeFilter("complited", props.id)
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onClickRemoveTodoList}>X</button>
            <div>
                <input
                    value={taskName}
                    onChange={onTaskNameChange}
                    onKeyPress={onAddTaskKeyPressed}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = e.currentTarget.checked
                        props.changeStatus(t.id, newCheckBoxValue, props.id)
                    }
                    return (
                        <li key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    onClick={onAllClickHandler}
                    className={props.filter === "all" ? "active" : ""}>All
                </button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === "active" ? "active" : ""}>Active
                </button>
                <button
                    onClick={onComplitedClickHandler}
                    className={props.filter === "complited" ? "active" : ""}>Completed
                </button>
            </div>
        </div>
    )
}
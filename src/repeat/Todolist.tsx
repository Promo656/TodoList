import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./TestApp";
import s from "./../App.module.css"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType, todoListId:string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
    id:string
}

export function Todolist(props: PropsType) {

    const [newTasksTitle, setNewTasksTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTasksTitle)
            setNewTasksTitle("")
        }
    }
    const addTasks = () => {
        if (newTasksTitle.trim() !== "") {
            props.addTask(newTasksTitle)
            setNewTasksTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTasksTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ""}
            />
            <button onClick={addTasks}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id}
                                   className={t.isDone ? s.isDone : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    }
                )
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? s.activeFilter : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === "active" ? s.activeFilter : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? s.activeFilter : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

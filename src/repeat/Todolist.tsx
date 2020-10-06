import React, {ChangeEvent} from 'react';
import {FilterType} from "./TestApp";
import s from "./../App.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodoList: (todolistId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, value: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.changeTaskTitle(t.id, props.id, value)
                        }
                        return <li key={t.id}
                                   className={t.isDone ? s.isDone : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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


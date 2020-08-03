import React, {ChangeEvent} from "react";
import {TodoListPropsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export function TodoList(props: TodoListPropsType) {

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

    const addTask=(title:string)=>{
        props.addTasks(title, props.id)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodoList}>X</button>
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {props.tasks.map((t) => {

                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }

                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValue=e.currentTarget.checked
                        props.changeStatus(t.id, newValue, props.id)
                    }

                    return (
                        <li key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} editMode={true}/>
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


import React, {ChangeEvent} from "react";
import {TodoListPropsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTasks(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={onClickRemoveTodoList}> <Delete/></IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <div>
                {props.tasks.map((t) => {

                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }

                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newValue = e.currentTarget.checked
                        props.changeStatus(t.id, newValue, props.id)
                    }
                    let changeTitle = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return (
                        <div key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan
                                title={t.title}
                                onChange={changeTitle}/>
                            <IconButton onClick={removeTask}> <Delete/></IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === "all" ? "outlined" : "text"}
                    color={"default"}
                >All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={props.filter === "active" ? "outlined" : "text"}
                    color={"primary"}
                >Active
                </Button>
                <Button
                    onClick={onComplitedClickHandler}
                    variant={props.filter === "complited" ? "outlined" : "text"}
                    color={"secondary"}
                >Completed
                </Button>
            </div>
        </div>
    )
}


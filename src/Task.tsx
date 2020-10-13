import React, {ChangeEvent, useCallback} from "react";
import s from "./App.module.scss";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todoListId)
    }, [props.removeTask, props.task.id, props.todoListId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }, [props.changeTaskStatus, props.task.id, props.todoListId])

    const onChangeTitleHandler = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, props.todoListId, value)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return <div key={props.task.id}
                className={props.task.isDone ? s.isDone : ""}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandler}
            checked={props.task.isDone}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})
import React, {useCallback} from 'react';
import {FilterValuesType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodoList: (todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist is rendering")

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    let filteredTasks = props.tasks
    if (props.filter === "active") {
        filteredTasks = props.tasks.filter(t => t.isDone == false)
    }
    if (props.filter === "completed") {
        filteredTasks = props.tasks.filter(t => t.isDone === true)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                filteredTasks.map((t) =>
                    <Task
                        key={t.id}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        todoListId={props.id}
                        task={t}
                    />
                )
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "outlined"} color={"default"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"} color={"primary"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"} color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


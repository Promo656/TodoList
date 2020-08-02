import React, {useState} from "react";
import {ListOfTasks} from "./ListOfTasks";
import {v1} from "uuid";

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    removeTasks: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListId: string) => void
    changeIsDoneStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
}
export type TasksType = TaskType[]
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "complited"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function TestApp() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn?", filter: "all"},
        {id: todolistId2, title: "What to buy?", filter: "complited"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todolistId1]: [
                {id: v1(), title: "Wake up", isDone: true},
                {id: v1(), title: "Do it", isDone: false},
                {id: v1(), title: "Win", isDone: true}
            ],
            [todolistId2]: [
                {id: v1(), title: "Drive to work", isDone: true},
                {id: v1(), title: "Do something", isDone: false},
                {id: v1(), title: "Go home", isDone: true}
            ]
        }
    )

    function removeTask(taskId: string, todoListId: string) {
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = todolistTasks.filter(t => t.id != taskId)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValueType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeIsDoneStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
            setTasks({...tasks})
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className={"App"}>
            {
                todoLists.map(tl => {

                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "active") {
                        filteredTasks = filteredTasks.filter((f) => f.isDone === false)
                    }
                    if (tl.filter === "complited") {
                        filteredTasks = filteredTasks.filter((f) => f.isDone === true)
                    }
                    return (
                        <ListOfTasks
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={filteredTasks}
                            removeTasks={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeIsDoneStatus={changeIsDoneStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    )
}
import React, {useState} from "react";
import {ListOfTasks} from "./ListOfTasks";
import {v1} from "uuid";

type TasksType = Array<TaskType>
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskid: string) => void
    changeFilter: (value: FilterType) => void
    addTask:(title:string)=>void
}
type FilterType = "all" | "active" | "completed"

export function TestApp() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "Build a house", isDone: true},
        {id: v1(), title: "Raise a child", isDone: false},
        {id: v1(), title: "Buy a car", isDone: true},
        {id: v1(), title: "Create a business", isDone: false},
        {id: v1(), title: "Leave from Russia", isDone: false},
        {id: v1(), title: "Be happy", isDone: false},
    ])

    function removeTask(taskId: string) {
        tasks = tasks.filter(t => {
            return t.id !== taskId
        })
        setTasks(tasks)
    }

    let [filter, setFilter] = useState<FilterType>("all")

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    function addTask (title:string) {
    let task={id: v1(), title: title, isDone: true}
    let newTasks=[task,...tasks]
        setTasks(newTasks)
    }

    return (
        <div>
            <ListOfTasks
                title="List of necessary knowledge"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    )
}
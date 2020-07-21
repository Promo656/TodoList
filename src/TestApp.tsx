import React, {useState} from "react";
import {ListOfTasks} from "./ListOfTasks";
import {v1} from "uuid";

export type TasksType = Array<TaskType>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueTYpe = "all" | "active" | "complited"

export function TestApp() {

    let [tasks, setTasks] = useState<TasksType>([
        {id: v1(), title: "Wake up", isDone: true},
        {id: v1(), title: "Do it", isDone: false},
        {id: v1(), title: "Win", isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValueTYpe>("all")

    function removeTask(taskId: string) {
        let filterTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(filterTasks)
    }

    function changeFilter(value: FilterValueTYpe) {
        setFilter(value)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)

    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter((f) => f.isDone === false)
    }
    if (filter === "complited") {
        filteredTasks = tasks.filter((f) => f.isDone === true)
    }

    function changeIsDoneStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div>
            <ListOfTasks
                tasks={filteredTasks}
                removeTasks={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeIsDoneStatus={changeIsDoneStatus}
                filter={filter}
            />
        </div>
    )
}
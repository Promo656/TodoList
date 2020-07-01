import React, {useState} from "react";
import {ListOfTasks} from "./ListOfTasks";

type TasksType = Array<TaskType>
type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskid: number) => void
    changeFilter:(value:FilterType)=>void
}
type FilterType= "all"|"active"|"completed"

export function TestApp() {
    let [tasks, setTasks]=useState([
        {id: 1, title: "Build a house", isDone: true},
        {id: 2, title: "Raise a child", isDone: false},
        {id: 3, title: "Buy a car", isDone: true},
        {id: 4, title: "Create a business", isDone: false},
        {id: 5, title: "Leave from Russia", isDone: false},
        {id: 6, title: "Be happy", isDone: false},
    ])

    function removeTask(taskId: number) {
        tasks = tasks.filter(t => {
            return t.id !== taskId
        })
       setTasks(tasks)
    }

    let [filter, setFilter]=useState<FilterType>("all")

    let filteredTasks=tasks

    if(filter==="active"){
        filteredTasks=tasks.filter(t=>t.isDone===false)
    }
    if (filter==="completed"){
        filteredTasks=tasks.filter(t=>t.isDone===true)
    }
    function changeFilter(value:FilterType) {
    setFilter(value)
    }

    return (
        <div>
            <ListOfTasks
                title="List of necessary knowledge"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}
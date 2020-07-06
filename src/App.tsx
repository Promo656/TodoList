import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTasks:(newTaskName:string)=>void
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "complited"

export function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'TSX', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Sass', isDone: false},
        {id: v1(), title: 'LEss', isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function addTask(newTaskName:string) {
        let newTask={id: v1(), title: newTaskName, isDone: true}
        let newTasks=[newTask, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter((t: TaskType) => t.id !== taskId)
        setTasks(filteredTasks)
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let taskForTodoList = tasks
    if (filter === "active") {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === "complited") {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList
                title='What to learn?'
                tasks={taskForTodoList}
                addTasks={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}




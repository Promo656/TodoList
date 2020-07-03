import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "complited"

export function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'TSX', isDone: true},
        {id: 5, title: 'React', isDone: true},
        {id: 6, title: 'Sass', isDone: false},
        {id: 7, title: 'LEss', isDone: true}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: number) {
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}




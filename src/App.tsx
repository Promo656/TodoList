import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTasks: (newTaskName: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "complited"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "complited"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todoListId1]: [
                {id: v1(), title: 'HTML', isDone: false},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true}
            ],
            [todoListId1]: [
                {id: v1(), title: 'TSX', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Sass', isDone: false},
                {id: v1(), title: 'LEss', isDone: true}
            ]
        }
    )

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function addTask(newTaskName: string, todoListId: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: true}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListId: string) {
        setTodoList(
            todoLists.filter(tl => tl.id !== todoListId)
        )
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let taskForTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }

                    if (tl.filter === "complited") {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            filter={filter}
                            title={tl.title}
                            tasks={taskForTodoList}
                            addTasks={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    )
}




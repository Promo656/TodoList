import React, {useState} from 'react';
import {TaskType, Todolist} from './Todolist';
import s from "./../App.module.css"
import {v1} from "uuid";

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = "all" | "active" | "completed"

function TestApp() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to buy", filter: "active"},
        {id: todoListId2, title: "What to learn", filter: "completed"}
    ])

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo!!", isDone: false}]
    })

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: FilterType, todoListId: string) {
        let todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }


    return (
        <div className={s.app}>
            {todoLists.map((tl) => {

                let filteredTasks = tasks[tl.id]
                if (tl.filter === "active") {
                    filteredTasks = filteredTasks.filter(t => t.isDone == true)
                }
                if (tl.filter === "completed") {
                    filteredTasks = filteredTasks.filter(t => t.isDone === false)
                }

                return <Todolist title={tl.title}
                                 id={tl.id}
                                 key={tl.id}
                                 tasks={filteredTasks}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                />
            })}
        </div>
    );
}

export default TestApp;

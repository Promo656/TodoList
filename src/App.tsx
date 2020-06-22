import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    const task1: Array<TaskPropsType> = [
        {
            id: 1,
            title: "HTML",
            isDone: false
        },
        {
            id: 2,
            title: "JS",
            isDone: false
        },
        {
            id: 3,
            title: "CSS",
            isDone: false
        }
    ];
    const task2: Array<TaskPropsType> = [
        {
            id: 4,
            title: "Bear",
            isDone: false
        },
        {
            id: 5,
            title: "Fish",
            isDone: false
        },
        {
            id: 6,
            title: "Cheeps",
            isDone: false
        }
    ];
    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task1}/>
            <TodoList title={"What to buy"} tasks={task2}/>
        </div>
    );
}

export default App;



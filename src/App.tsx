import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const tasks1=[
        {id:1,title:'HTML',isDone:true},
        {id:2,title:'CSS',isDone:false},
        {id:3,title:'JS',isDone:true},
        {id:4,title:'TSX',isDone:true}
    ]
    const tasks2=[
        {id:1, title:'Beer',isDone:false},
        {id:2, title:'Cheeps',isDone:true},
        {id:3, title:'Pizza',isDone:false},
        {id:4, title:'Cola',isDone:true}
    ]
    return (
        <div className="App">
            <TodoList title='What to learn?' tasks={tasks1}/>
            <TodoList title='What to buy?' tasks={tasks2}/>
        </div>
    );
}
export default App;


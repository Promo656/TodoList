import React, {useState} from "react";
import {v1} from "uuid";

type TasksType = Array<TaskType>
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function ListOfTasks() {
    let [tasks, setTasks] = useState<TasksType>([
            {id: v1(), title: "Wake up", isDone: true},
            {id: v1(), title: "Do it", isDone: false},
            {id: v1(), title: "Win", isDone: true}
        ]
    )

    return (
        <div>
            <h1> Main tasks</h1>
            <input type="text"/>
            <button>X</button>
            <ul>
                {tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
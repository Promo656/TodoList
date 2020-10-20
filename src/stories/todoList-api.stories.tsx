import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todoLists-api";

export default {
    title: 'API'
}


export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodoList("What to spent")
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "0ebd21b3-5859-4c21-b19e-ade10d41c470"
        todoListsAPI.deleteTodoList(todoListId)
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "0236d15a-8eb1-4a42-a817-e56b01fb8867"
        todoListsAPI.updateTodoListTitle(todoListId, "Meal")
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "e7bf5700-024f-4c6f-b10d-382ac423cf21"
        todoListsAPI.getTasks(todoListId)
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "e7bf5700-024f-4c6f-b10d-382ac423cf21"
        todoListsAPI.createTask(todoListId, "Bread")
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "e7bf5700-024f-4c6f-b10d-382ac423cf21"
        const taskId = "fe20c3ce-0f4c-4903-a4d1-347989b862cb"
        todoListsAPI.deleteTask(todoListId, taskId)
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "e7bf5700-024f-4c6f-b10d-382ac423cf21"
        const taskId = "45e053b2-f056-40cf-a79f-67e73362cebc"
        todoListsAPI.updateTaskTitle(todoListId, taskId)
            .then(response => {
                return setState(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
import {TaskStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todoListId1, todoListId2} from "./todoListsReducer";

export type ActionType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

const initialState: TaskStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}],
    [todoListId2]: [
        {id: v1(), title: "Hello world", isDone: true},
        {id: v1(), title: "I am Happy", isDone: false},
        {id: v1(), title: "Yo!!", isDone: false}]

}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todoListTask = state[action.todolistId]
            state[action.todolistId] = todoListTask
                .map((t) => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTask = state[action.todolistId]
            state[action.todolistId] = todoListTask
                .map((t) => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
//--------------------------------------REMOVE-TASK-----------------------------
export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
//--------------------------------------ADD-TASK-----------------------------
export type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: "ADD-TASK", title, todolistId}
}
//--------------------------------------CHANGE-TASK-STATUS-----------------------------
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone}
}
//--------------------------------------CHANGE-TASK-TITLE-----------------------------
export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todolistId: string
    title: string
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
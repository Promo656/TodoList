import {FilterType, TaskStateType, TodoListType} from "./TestApp";
import {v1} from "uuid";
import {act} from "react-dom/test-utils";
import {AddTodolistAT} from "./todoListReducer";

export type ActionType =
    removeTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD_TASK": {
            const stateCopy = state
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
            const stateCopy = state
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE":{
            const stateCopy = state
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy = state
            stateCopy[v1()]=[]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this action type")
    }
}
//--------------------------------------REMOVE-TASK-----------------------------
export type removeTaskAT = {
    type: "REMOVE_TASK"
    taskId: string
    todolistId: string
}
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return {type: "REMOVE_TASK", taskId: taskId, todolistId: todolistId}
}
//--------------------------------------ADD-TASK-----------------------------
export type AddTaskAT = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: "ADD_TASK", title: title, todolistId: todolistId}
}
//--------------------------------------CHANGE-TASK-STATUS-----------------------------
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, todolistId: todolistId, isDone: isDone}
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
    return {type: "CHANGE-TASK-TITLE", taskId: taskId, title: title, todolistId: todolistId}
}
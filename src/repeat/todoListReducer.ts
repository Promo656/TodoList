import {FilterType, TodoListType} from "./TestApp";
import {v1} from "uuid";

export type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            let todoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, todoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find((tl) => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
//--------------------------------------REMOVE-TODOLIST-----------------------------
export type RemoveTodolistAT = {
    type: "REMOVE_TODOLIST"
    id: string
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: "REMOVE_TODOLIST", id: todolistId}
}
//--------------------------------------ADD-TODOLIST-----------------------------
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title: title}
}
//--------------------------------------CHANGE-TODOLIST-TITLE----------------------
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export const ChangeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}
//--------------------------------------HANGE-TODOLIST-FILTER----------------------
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}
export const ChangeTodolistFilterAC = (todoListId: string, filter: FilterType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id:todoListId, filter:filter}
}
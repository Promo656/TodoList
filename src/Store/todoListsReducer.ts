import {FilterValuesType, TodoListType} from "../AppWithReducers";
import {v1} from "uuid";

export type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this type")
    }
}
//--------------------------------------REMOVE-TODOLIST-----------------------------
export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
//--------------------------------------ADD-TODOLIST-----------------------------
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
//--------------------------------------CHANGE-TODOLIST-TITLE----------------------
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export const changeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}
//--------------------------------------CHANGE-TODOLIST-FILTER----------------------
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id:todoListId, filter:filter}
}
import {FilterValuesType, TodoListType} from "../AppWithReducers";
import {v1} from "uuid";

export type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodoListsTypeAT


export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: Array<TodoListType> = [
    {id: todoListId1, title: "What to buy", filter: "all"},
    {id: todoListId2, title: "What to learn", filter: "all"}
]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
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
        case "SET-TODOLIST":{
            return action.todoLists
        }
        default:
            return state
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
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter}
}
//--------------------------------------SET-TODOLIST-----------------------------
export type SetTodoListsTypeAT = {
    type: "SET-TODOLIST"
    todoLists: Array<TodoListType>
}
export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsTypeAT => {
    return {type: "SET-TODOLIST", todoLists: todoLists}
}
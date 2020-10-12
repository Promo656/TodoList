import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todoListsReducer";
import {tasksReducer} from "./taskReducer";

const reducers= combineReducers({
    todoLists:todoListsReducer,
    tasks:tasksReducer
})

export const store = createStore(reducers)





// @ts-ignore
window.store=store

import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todoListsReducer";
import {tasksReducer} from "./taskReducer";

export type AppRootState = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducers,(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__())



// @ts-ignore
window.store = store

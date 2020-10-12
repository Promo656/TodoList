import React, {useReducer} from 'react';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./Store/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Store/taskReducer";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to learn", filter: "all"}
    ])

    let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo!!", isDone: false}]

    })

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTaskReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTaskReducer(action)
    }

    function removeTodoList(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTaskReducer(action)
        dispatchTodoListsReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTaskReducer(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchTodoListsReducer(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTaskReducer(action)
        dispatchTodoListsReducer(action)
    }

    function changeTaskTitle(taskId: string, todolistId: string, title: string) {
        const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatchToTaskReducer(action)
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatchTodoListsReducer(action)
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: "10px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {

                            let filteredTasks = tasksObj[tl.id]
                            if (tl.filter === "active") {
                                filteredTasks = filteredTasks.filter(t => t.isDone == true)
                            }
                            if (tl.filter === "completed") {
                                filteredTasks = filteredTasks.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper elevation={4} style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              id={tl.id}
                                              key={tl.id}
                                              tasks={filteredTasks}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;

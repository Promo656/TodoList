import React, {useCallback} from 'react';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Store/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {
    console.log("AppWithRedux is rendering")

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todoLists)
    const tasksObj = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, todolistId: string, title: string) => {
        const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }, [dispatch])


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
            <Container style={{minWidth:"290px"}}>
                <Grid container style={{padding: "10px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {

                            let filteredTasks = [...tasksObj[tl.id]]

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={4} style={{padding: "10px"}}>
                                        <Todolist title={tl.title}
                                                  id={tl.id}
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
                            )
                        }
                    )}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;

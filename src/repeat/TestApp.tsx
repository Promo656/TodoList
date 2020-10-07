import React, {useState} from 'react';
import {TaskType, Todolist} from './Todolist';
import s from "./TestApp.module.scss"
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = "all" | "active" | "completed"

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function TestApp() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to learn", filter: "all"}
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
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
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function removeTodoList(todolistId: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodoList)
        delete tasksObj[todolistId]
        setTasks(tasksObj)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterType, todoListId: string) {
        let todoList = todoLists.find((tl) => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    function addTodolist(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoList([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

    function changeTaskTitle(taskId: string, todolistId: string, value: string) {
        debugger
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = value
        }
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        const todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodoList([...todoLists])
        }
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
                <Grid container style={{padding:"10px 0"}}>
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
                                <Paper elevation={4} style={{padding:"10px"}}>
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

export default TestApp;

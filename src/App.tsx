import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTasks: (newTaskName: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeStatus: (id: string, newValue: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (newTitle: string, id: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "complited"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todoListId1]: [
                {id: v1(), title: 'HTML', isDone: false},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true}
            ],
            [todoListId2]: [
                {id: v1(), title: 'TSX', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Sass', isDone: false},
                {id: v1(), title: 'LEss', isDone: true}
            ]
        }
    )

    function addTask(newTaskName: string, todoListId: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: true}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListId: string) {
        setTodoList(
            todoLists.filter(tl => tl.id !== todoListId)
        )
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todolist: TodoListType =
            {id: v1(), title: title, filter: "all"}
        setTodoList([todolist, ...todoLists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
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
            <Container fixed>
                <Grid container justify={"center"} style={{padding: "20px"}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container justify={"center"} spacing={5}>{
                    todoLists.map(tl => {
                        let taskForTodoList = tasks[tl.id]
                        if (tl.filter === "active") {
                            taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                        }
                        if (tl.filter === "complited") {
                            taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                        }

                        return (
                            <Grid item>
                                <Paper
                                    elevation={6}
                                    style={{padding: "10px"}}>
                                    <TodoList
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        key={tl.id}
                                        id={tl.id}
                                        filter={tl.filter}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        addTasks={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    )
}




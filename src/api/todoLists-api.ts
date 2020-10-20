import axios from "axios";

type GetTodoListsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodoList = {
    resultCode: number
    messages: Array<string>
    data: {
        item: GetTodoListsType
    }
}

type DeleteTodoListType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTodoListTitleType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type GetTasks = {
    totalCount: number
    error: string | null
    item: TaskType[]
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        "API-KEY": "fe15149f-b79e-4d26-a74a-8a6ca4b0ce0d"
    }
})

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<Array<GetTodoListsType>>(`todo-lists`)
            .then(response => {
                return response.data
            })
    },
    createTodoList(title: string) {
        return instance.post<CreateTodoList>(`todo-lists`, {title: title})
            .then(response => {
                return response.data
            })
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<DeleteTodoListType>(`todo-lists/${todoListId}`)
            .then(response => {
                return response.data
            })
    },
    updateTodoListTitle(todoListId: string, title: string) {
        return instance.put<UpdateTodoListTitleType>(`todo-lists/${todoListId}`, {title: title})
            .then(response => {
                return response.data
            })
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasks>(`todo-lists/${todoListId}/tasks`)
            .then(response => {
                return response.data
            })
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
            .then(response => {
                return response.data
            })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => {
                return response.data
            })
    },
    updateTaskTitle(todolistId: string, taskId: string){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response=>{
                return response.data
            })
    }
}
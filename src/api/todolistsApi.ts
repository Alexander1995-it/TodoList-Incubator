import axios, {AxiosResponse} from "axios";


const incstanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'da9cb287-f4c3-4451-9409-0a992045ae44'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return incstanse.get<TodolistType[]>('todo-lists')
    },
    deleteTodolists(todoListID: string) {
        return incstanse.delete<ResponseType>(`todo-lists/${todoListID}`)
    },
    addTodolist (title: string) {
        return incstanse.post<{title: string}, AxiosResponse<ResponseType<{item: TodolistType}>>> ('todo-lists', {title})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return incstanse.get (`todo-lists/${todolistId}/tasks`)
    },
    addTask (todolistId: string, title: string) {
        return incstanse.post<{title: string}, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks`,{title})
    }
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}



import React from 'react';
import {v1} from 'uuid';
import {TasksReducerType} from "../AppWithRedux";
import {todolistID1, todolistID2} from "./todoListsReducer";

const initialState: TasksReducerType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}


export const TasksReducer = (state: TasksReducerType = initialState, action: TaskReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)

            }
        }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case 'ADD-TASK-TODOLIST': {
            return {
                ...state,
                [action.payload.newTodolistID]: [
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true},
                ]
            }
        }
        default:
            return state
    }

};

type TaskReducerType = RemoveTasksACType | AddTaskACType | ChangeStatusType | EditTaskType | addTasksTodoListType
type RemoveTasksACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>
type EditTaskType = ReturnType<typeof editTaskAC>
type addTasksTodoListType = ReturnType<typeof addTasksTodoListAC>

export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            id
        }

    } as const
}
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            title
        }
    } as const
}
export const changeStatusAC = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todoListID,
            taskId,
            isDone
        }
    } as const
}
export const editTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}
export const addTasksTodoListAC = (newTodolistID: string) => {
    return {
        type: 'ADD-TASK-TODOLIST',
        payload: {
            newTodolistID
        }
    } as const
}

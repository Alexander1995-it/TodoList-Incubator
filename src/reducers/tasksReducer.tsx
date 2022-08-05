import React from 'react';
import {v1} from 'uuid';
import {TasksReducerType} from "../App";

export const TasksReducer = (state: TasksReducerType, action: TaskReducerType) => {
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
        case 'ADD-TASKS-TODOLIST': {
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

type TaskReducerType = RemoveTasksACType | AddTaskACType | ChangeStatusType | EditTaskType | addTasksTodoList
type RemoveTasksACType = ReturnType<typeof removeTasksAC>
type AddTaskACType = ReturnType<typeof addTasksAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>
type EditTaskType = ReturnType<typeof editTaskAC>
type addTasksTodoList = ReturnType<typeof addTasksTodoListAC>

export const removeTasksAC = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            id
        }

    } as const
}
export const addTasksAC = (todoListID: string, title: string) => {
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
        type: 'ADD-TASKS-TODOLIST',
        payload: {
            newTodolistID
        }
    } as const
}

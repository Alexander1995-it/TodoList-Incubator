import React from 'react';
import {tasksAPI, TaskType} from "../api/todolistsApi";
import {AppActionType, AppThunk} from "../store/store";

const initialState: TasksStateType = {}


export const TasksReducer = (state: TasksStateType = initialState, action: AppActionType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state, [action.todolistId]: action.tasks
            }
        case 'ADD_TASK': {
            console.log ('reducer')
            return {
                [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]],
                ...state
            }
        }
        case 'SET_TODOLISTS': {
            let copyState = {...state}
            action.todolists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }

        case 'ADD_TODOLIST': {
            return {...state, [action.newTitle.id]: []}
        }

        case 'REMOVE_TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }

        // case 'REMOVE-TASK': {
        //     return {
        //         ...state,
        //         [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.id)
        //     }
        // }

        // case 'CHANGE-STATUS': {
        //     return {
        //         ...state,
        //         [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
        //             ? {...el, isDone: action.payload.isDone}
        //             : el)
        //
        //     }
        // }
        // case 'EDIT-TASK': {
        //     return {
        //         ...state,
        //         [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID
        //             ? {...el, title: action.payload.newTitle}
        //             : el
        //         )
        //     }
        // }
        // case 'ADD-TASK-TODOLIST': {
        //     return {
        //         ...state,
        //         [action.payload.newTodolistID]: [
        //             {id: v1(), title: "HTML&CSS", isDone: true},
        //             {id: v1(), title: "JS", isDone: true},
        //         ]
        //     }
        // }
        default:
            return state
    }

};

export type TasksActionType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
// type RemoveTasksACType = ReturnType<typeof removeTaskAC>
// type ChangeStatusType = ReturnType<typeof changeStatusAC>
// type EditTaskType = ReturnType<typeof editTaskAC>
// type addTasksTodoListType = ReturnType<typeof addTasksTodoListAC>

//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'ADD_TASK',
    payload: {todolistId, task}
} as const)

export const fetchTasksTC = (todoListID: string): AppThunk => async (dispatch) => {
    let response = await tasksAPI.getTasks(todoListID)
    dispatch(setTasksAC(todoListID, response.data.items))
}
export const createTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    const response = await tasksAPI.addTask(todolistId, title)
    const task = response.data.data.item
    if (response.data.resultCode === 0) {
        dispatch(addTaskAC(todolistId, task))
    }

}
export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            id
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


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

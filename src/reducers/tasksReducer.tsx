import React from 'react';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolistsApi";
import {AppActionType, AppRootStateType, AppThunk} from "../store/store";

const initialState: TasksStateType = {}


export const TasksReducer = (state: TasksStateType = initialState, action: AppActionType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state, [action.todolistId]: action.tasks
            }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]
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

        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }

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

        default:
            return state
    }

};

export type TasksActionType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeStatusAC>
// type EditTaskType = ReturnType<typeof editTaskAC>


//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'ADD_TASK',
    payload: {todolistId, task}
} as const)

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const changeStatusAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistId,
            taskId,
            model
        }
    } as const
}

// export const editTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
//     return {
//         type: 'EDIT-TASK',
//         payload: {
//             todolistID,
//             taskID,
//             newTitle
//         }
//     } as const
// }

//thunk
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

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    const response = await tasksAPI.removeTask(todolistId, taskId)
    if (response.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, taskId))
    }
}

export const updateStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status
        }
        const response = await tasksAPI.updateTask(todolistId, taskId, model)
        if (response.data.resultCode === 0) {
            dispatch(changeStatusAC(todolistId, taskId, model))
        }
    }

}

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

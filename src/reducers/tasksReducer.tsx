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
        // case 'ADD-TASK': {
        //     const newTask = {id: v1(), title: action.payload.title, isDone: false}
        //     return {
        //         ...state,
        //         [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
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
// type RemoveTasksACType = ReturnType<typeof removeTaskAC>
// type AddTaskACType = ReturnType<typeof addTaskAC>
// type ChangeStatusType = ReturnType<typeof changeStatusAC>
// type EditTaskType = ReturnType<typeof editTaskAC>
// type addTasksTodoListType = ReturnType<typeof addTasksTodoListAC>

//actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todolistId, tasks} as const)
export const addTaskAC = (data: TaskType) => ({type: 'ADD_TASK', data} as const)

export const fetchTasksTC = (todoListID: string): AppThunk => async (dispatch) => {
    let response = await tasksAPI.getTasks(todoListID)
    dispatch(setTasksAC(todoListID, response.data.items))
}
 export const createTask = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    const response = await tasksAPI.addTask(todolistId, title)
     if (response.data.resultCode === 0) {
        // dispatch(addTaskAC(response.data.data))
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

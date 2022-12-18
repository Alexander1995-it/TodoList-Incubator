import React from 'react';
import {todolistsAPI, TodolistType} from "../api/todolistsApi";
import {AppThunk} from "../store/store";


const initialState: Array<TodolistDomainType> = []

export const TodoListsReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        case 'ADD_TODOLIST':
            return [{...action.newTitle, filter: 'all'}, ...state]
        case 'REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.todolistID)
        }
        case 'CHANGE_FILTER': {
            return state.map(t => t.id === action.payload.todoListID ? {...t, filter: action.payload.value} : t)
        }

        default:
            return state
    }
};

export type TodoListsActionType =
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeFilterAC>


// actions
export const removeTodoListAC = (todolistID: string) => ({type: 'REMOVE_TODOLIST', todolistID} as const)
export const addTodoListAC = (newTitle: TodolistType) => ({type: 'ADD_TODOLIST', newTitle} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)
export const changeFilterAC = (todoListID: string, value: FilterValuesType) => ({
    type: 'CHANGE_FILTER',
    payload: {todoListID, value}
} as const)

//thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    let response = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(response.data))
}
export const createTodolistTC = (newTodolist: string): AppThunk => async (dispatch) => {
    let response = await todolistsAPI.addTodolist(newTodolist)
    dispatch(addTodoListAC(response.data.data.item))
}
export const deleteTodolistsTC = (todoListID: string): AppThunk => async (dispatch) => {
    const response = await todolistsAPI.deleteTodolists(todoListID)
    if (response.data.resultCode === 0) {
        dispatch(removeTodoListAC(todoListID))
    }

}

//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}



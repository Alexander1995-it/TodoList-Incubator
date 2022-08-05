import React from 'react';
import {FilterValuesType, TodolistReducerType, TodolistsType} from "../App";


export const TodoListsReducer = (state: TodolistReducerType, action: TodoListType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            let newTodoList: TodolistsType = {
                id: action.payload.newTodolistID,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [
                newTodoList,
                ...state
            ]
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoListID
                ? {...el, filter: action.payload.value}
                : el
            )
        }
        default:
            return state
    }
};

type TodoListType = RemoveTodoListACType | AddTodoListACType | ChangeFilterType
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
type AddTodoListACType = ReturnType<typeof addTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const removeTodoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}
export const addTodoListAC = (newTodolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistID,
            newTitle
        }
    } as const
}
export const changeFilterAC = (todoListID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todoListID,
            value
        }
    } as const
}




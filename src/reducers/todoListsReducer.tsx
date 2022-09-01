import React from 'react';
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: Array<TodoListType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodoListsReducer = (state: Array<TodoListType> = initialState, action: TodoListsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            let newTodoList: TodoListType = {
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

type TodoListsReducerType = RemoveTodoListACType | AddTodoListACType | ChangeFilterType
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




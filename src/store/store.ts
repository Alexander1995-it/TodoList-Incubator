import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodoListsActionType, TodoListsReducer} from "../reducers/todoListsReducer";
import {TasksActionType} from '../reducers/tasksReducer'
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: TodoListsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodoListsActionType | TasksActionType


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
import {combineReducers, compose, legacy_createStore} from "redux";
import {TasksReducer} from "../reducers/tasksReducer";
import {TodoListsReducer} from "../reducers/todoListsReducer";




declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: TodoListsReducer
})

export const store = legacy_createStore(rootReducer, composeEnhancers())

export type AppRotStateType = ReturnType<typeof rootReducer>
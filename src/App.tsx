import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import {addTasksTodoListAC} from "./reducers/tasksReducer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListAC, createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./reducers/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {useAppDispatch} from "./common/common";
import {TaskType} from "./api/todolistsApi";

export type TasksReducerType = { [key: string]: Array<TaskType> }

const App = () =>  {

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodoList = (newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            <Grid container spacing={3}>
                {todoLists.map(el => {
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <TodoList
                                key={el.id}
                                title={el.title}
                                todoList={el}
                            />
                        </Paper>
                    </Grid>

                })}
            </Grid>
        </div>
    );
}

export default App;





import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import AddItemForm from "./components/AddItemForm";
import {TasksStateType} from "./reducers/tasksReducer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./reducers/todoListsReducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {useAppDispatch} from "./common/common";



const App = () =>  {

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
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





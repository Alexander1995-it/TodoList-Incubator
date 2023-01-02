import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import AddItemForm from "./common/AddItemForm/AddItemForm";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./reducers/todoListsReducer";
import {useAppDispatch, useAppSelector} from "./common/hooks/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "./reducers/appReducer";
import CustomizedSnackbars from "./common/ErrorSnacbar/ErrorSnacbar";
import Header from "./components/Header/Header";
import TodoLists from "./components/TodoLists/TodoLists";


const App = () => {

    let status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <Header/>
            <div style={{height: '10px'}}>
                {status === 'loading' && <LinearProgress/>}
            </div>
            <CustomizedSnackbars/>
            <TodoLists/>
        </div>
    );
}

export default App;





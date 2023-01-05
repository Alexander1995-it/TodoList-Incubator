import React, {useEffect} from 'react';
import AddItemForm from "../../common/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "../TodoList/TodoList";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../../reducers/todoListsReducer";
import {Navigate} from "react-router-dom";

const TodoLists = () => {

    let todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC())
        }
    }, [])

    const addTodoList = (newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className='mainBlock'>
            <AddItemForm label='Add todoList' callBack={addTodoList}/>
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
};

export default TodoLists;
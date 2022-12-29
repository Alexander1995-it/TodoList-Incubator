import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import AddItemForm from "./components/AddItemForm";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./reducers/todoListsReducer";
import {useAppDispatch, useAppSelector} from "./common/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "./reducers/appReducer";
import CustomizedSnackbars from "./common/ErrorSnacbar/ErrorSnacbar";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const App = () => {

    let todoLists = useAppSelector<Array<TodolistDomainType>>(state => state.todoLists)
    let status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodoList = (newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoList
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{height: '10px'}}>
                {status === 'loading' && <LinearProgress/>}
            </div>
            <CustomizedSnackbars/>
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
        </div>
    );
}

export default App;





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


const App = () =>  {

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
            {status === 'loading' && <LinearProgress />}
          <CustomizedSnackbars/>
         <div>
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
        </div>
    );
}

export default App;





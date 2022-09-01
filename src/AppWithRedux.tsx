import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import {addTasksTodoListAC} from "./reducers/tasksReducer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListAC, TodoListType} from "./reducers/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRotStateType} from "./store/store";

export type TasksReducerType = { [key: string]: Array<TaskType> }

function AppWithRedux() {

    let todoLists = useSelector<AppRotStateType, Array<TodoListType>>(state => state.todoLists)
    const dispatch = useDispatch()

    const addTodoList = (newTitle: string) => {
        let newTodolistID = v1()
        dispatch(addTodoListAC(newTodolistID, newTitle))
        dispatch(addTasksTodoListAC(newTodolistID))
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

export default AppWithRedux;





import React, {ChangeEvent} from 'react';
import AddItemForm from "./components/AddItemForm";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './components/AddItemForm.module.css'
import {changeFilterAC, removeTodoListAC, TodoListType} from "./reducers/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRotStateType} from "./store/store";
import {addTaskAC} from "./reducers/tasksReducer";
import Task from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodoListType
    title: string
}


export function TodoList(props: PropsType) {

    let tasks = useSelector<AppRotStateType, Array<TaskType>>(state => state.tasks[props.todoList.id])
    let dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeFilterAC(props.todoList.id, "all"));
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.todoList.id, "active"));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.todoList.id, "completed"));
    const onClickDeleteTodoList = () => dispatch(removeTodoListAC(props.todoList.id))

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(props.todoList.id, newTitle))
    }

    if (props.todoList.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.todoList.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <div className={s.title__delete}>
            <h3>{props.title}</h3>
            <IconButton onClick={onClickDeleteTodoList} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                tasks.map(t => <Task key={t.id} task={t} todoListID={props.todoList.id}/>)
            }
        </ul>
        <div>

            <Button variant={props.todoList.filter === 'all' ? "contained" : "text"} color="success"
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.todoList.filter === 'active' ? "contained" : "text"} color="secondary"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.todoList.filter === 'completed' ? "contained" : "text"} color="error"
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}

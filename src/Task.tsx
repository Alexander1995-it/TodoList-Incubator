import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./components/EtidTitle";
import s from './Task.module.css'
import {changeStatusAC, editTaskAC, removeTaskAC, removeTaskTC} from "./reducers/tasksReducer";
import {TaskType} from "./api/todolistsApi";
import {useAppDispatch} from "./common/hooks";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const editTaskHandler = (taskID: string, newTitle: string) => {
        // dispatch(editTaskAC(todoListID, taskID, newTitle))
    }
    const onHandlerDelete = () => dispatch(removeTaskTC(todolistId, task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(changeStatusAC(todoListID, task.id, e.currentTarget.checked))
    }

    return (
        <li className={task.status === 1 ? "is-done" : ""}>
            <Checkbox defaultChecked onChange={onChangeHandler} checked={task.status === 2}/>
            <EditableSpan callBack={(title) => editTaskHandler(task.id, title)} title={task.title}/>
            <button onClick={onHandlerDelete}>x</button>
        </li>
    );
});

export default Task;
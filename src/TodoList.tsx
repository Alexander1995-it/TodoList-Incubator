import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EtidTitle";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");
    const onClickDeleteTodoList = () => props.removeTodoList(props.todoListID)

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }

    const editTaskHandler = (taskID: string,newTitle: string) => {
        props.editTask(props.todoListID, taskID, newTitle)
    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={onClickDeleteTodoList}>delete</button>


        <div>

            <AddItemForm callBack={addTaskHandler}/>

        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }

                    // const editTaskHandler = (newTitle: string) => {
                    //     props.editTask(props.todoListID, t.id, newTitle)
                    // }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan callBack={(title) => editTaskHandler(t.id, title)} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

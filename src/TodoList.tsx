import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length ?
        props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span className={task.isDone ? 'isDone' : ''} key={task.id}>{task.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>
            )
        })
        : <span>Your taskList is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim ()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }

        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyDown={onKeyDownAddTask}
                       onChange={onChangeHandler}
                       value={title}
                       className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: 'hotpink'}}>Title is required</div>}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active': ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
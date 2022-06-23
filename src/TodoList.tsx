import React from 'react'

type TaskType = {
    id: number,
    text: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li key={props.tasks[0].id}><input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].text}</span></li>
                <li><input key={props.tasks[1].id} type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].text}</span></li>
                <li><input key={props.tasks[2].id} type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].text}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList
import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";



function App() {
    const title_1: string = 'What to learn'
    const title_2: string = 'What to buy'
    const tasks_1: Array<TaskType> = [
        {id: 1, text: 'HTML&CSS', isDone: false},
        {id: 2, text: 'JS', isDone: true},
        {id: 3, text: 'React', isDone: true}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, text: 'milk', isDone: true},
        {id: 2, text: 'bread', isDone: false},
        {id: 3, text: 'apple', isDone: true}
    ]
    return (
        <div className="App">
            <TodoList tasks = {tasks_1} title = {title_1}/>
            <TodoList tasks = {tasks_2} title = {title_2}/>
        </div>
    );
}

export default App;

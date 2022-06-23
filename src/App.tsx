import React from 'react';
import './App.css';
import TodoList from "./TodoList";



function App() {
    const title_1 = 'What to learn'
    const tasks_1 = [
        {id: 1, text: 'HTML&CSS', isDone: true},
        {id: 2, text: 'JS', isDone: true},
        {id: 3, text: 'React', isDone: true}
    ]
    return (
        <div className="App">
            <TodoList tasks = {tasks_1} title = {title_1}/>
        </div>
    );
}

export default App;

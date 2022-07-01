import React, {useState} from 'react'
import './App.css'
import TodoList, {TaskType} from './TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


    const title: string = 'What to learn'

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    // let tasks: Array<TaskType> = [
    //     {id: 1, title: 'HTML&CSS', isDone: false},
    //     {id: 2, title: 'JS', isDone: true},
    //     {id: 3, title: 'React', isDone: true}
    // ]

    const removeTask = (taskID: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updateTasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case 'active':
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className='App'>
            <TodoList tasks={tasksForRender}
                      title={title}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

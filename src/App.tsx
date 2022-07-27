import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string, title: string, filter: FilterValuesType }


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== id)})

    }

    function addTask(todoListID: string, title: string) {
        const task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})

    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map((el) => el.id === taskId
                ? {...el, isDone: isDone}
                : el
            )
        })

    }


    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    function removeTodoList(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))

    }

    const addTodoList = (newTitle: string) => {
        let newTodoListID = v1()
        let newTodoList: TodolistsType = {id: newTodoListID, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map (el => el.id === taskID ? {...el, title: newTitle} : el)})
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        editTask={editTask}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        todoListID={el.id}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;

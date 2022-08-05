import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import {
    addTasksAC,
    addTasksTodoListAC,
    changeStatusAC,
    editTaskAC,
    removeTasksAC,
    TasksReducer
} from "./reducers/tasksReducer";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTodoListAC, changeFilterAC, removeTodoListAC, TodoListsReducer} from "./reducers/todoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksReducerType = { [key: string]: Array<TaskType> }
export type TodolistReducerType = Array<TodolistsType>


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(TodoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
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


    const removeTask = (todoListID: string, id: string) => {
        tasksDispatch(removeTasksAC(todoListID, id))
    }

    const addTask = (todoListID: string, title: string) => {
        tasksDispatch(addTasksAC(todoListID, title))
    }

    const changeStatus= (todoListID: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(todoListID, taskId, isDone))
    }


    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        todolistsDispatch(changeFilterAC(todoListID, value))
    }

    const removeTodoList =(todolistID: string) => {
        todolistsDispatch(removeTodoListAC (todolistID))

    }

    const addTodoList = (newTitle: string) => {
        let newTodolistID = v1()
        todolistsDispatch(addTodoListAC(newTodolistID, newTitle))
        tasksDispatch(addTasksTodoListAC(newTodolistID))
        // let newTodoListID = v1()
        // let newTodoList: TodolistsType = {id: newTodoListID, title: newTitle, filter: 'all'}
        // setTodolists([...todolists, newTodoList])
        // setTasks({...tasks, [newTodoListID]: []})
    }

    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        tasksDispatch(editTaskAC(todolistID, taskID, newTitle))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            <Grid container spacing={3}>

                {todolists.map(el => {
                    let tasksForTodolist = tasks[el.id];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                    }
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <TodoList
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
                        </Paper>
                    </Grid>

                })}
            </Grid>

        </div>
    );
}

export default App;





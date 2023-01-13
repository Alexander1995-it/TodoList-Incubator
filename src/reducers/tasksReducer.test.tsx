import {removeTaskAC, tasksReducer, TasksStateType} from "./tasksReducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        '1': [
            {
                description: 'string',
                title: 'string',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: 'task1',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'string',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: 'task2',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            }
        ]
    }
})


test('correct todolist should be removed', () => {


    const endState = tasksReducer(startState, removeTaskAC('1', 'task1'))

    expect(endState['1'].length).toBe(1)
})
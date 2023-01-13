import {removeTodoListAC, TodolistDomainType, todolistsReducer} from "./todolistsReducer";


let startState: Array<TodolistDomainType>

beforeEach(() => {
    startState = [
        {id: '11', title: 'What to learn', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'},
        {id: '22', title: 'What to buy', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {
    let todolistID1 = '1'
    let todolistID2 = '2'
    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: 'What to learn', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', addedDate: '', order: 1, filter: 'all', entityStatus: 'idle'}
    ]
    const endState = todolistsReducer(startState, removeTodoListAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
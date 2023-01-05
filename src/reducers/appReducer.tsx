export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)

export type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)


export type AppActionsType = SetAppStatusType | SetAppErrorType


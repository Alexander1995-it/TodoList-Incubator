import {authApi, AuthMeResponse} from "../api/todolistsApi";
import {AppThunk} from "../store/store";

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false
}

export const loginReducer = (state: StateAuthType = initialState, action: LoginActionType): StateAuthType => {
    switch (action.type) {
        case 'SET_AUTH_ME': {
            return {...state, ...action.data, isAuth: action.isAuth}
        }
        default:
            return state
    }
}

//type
type StateAuthType = typeof initialState
export type LoginActionType = ReturnType<typeof setAuthMe>

//action
const setAuthMe = (data: AuthMeResponse, isAuth: boolean) => ({type: 'SET_AUTH_ME', data, isAuth} as const)

//thunk
export const AuthMeTC = (): AppThunk => async (dispatch) => {
   try {
      let response = await authApi.authMe()
       if (response.data.resultCode === 0) {
           dispatch(setAuthMe(response.data.data, true))
       }

   } catch (e) {

   }
}
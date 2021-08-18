import {SetErrorActionType, setStatusAC, SetStatusActionType} from "../../state/app-reducer";
import {Dispatch} from "redux";
import {LoginAPI, LoginDataType} from "../../API/TodoListAPI";
import {handleNetworkServerError, handleServerAppError} from "../../utils/error-utils";
import {ThunkType} from "../../state/tasks-reducer";

//types
type LoginStateType = {
    isLoginIn: boolean
}
export type LoginActionsType = ReturnType<typeof setIsLoginIn>



//initialState an d reducer
const initialState = {
    isLoginIn: false
}

export const loginReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType  => {
    switch(action.type) {
        case "login/SET_IS_LOGIN_IN": {
            return {...state, isLoginIn: action.value}
        }
        default: return state
    }
}


//actions
export const setIsLoginIn = (value: boolean) => ({
        type: 'login/SET_IS_LOGIN_IN', value
    } as const)

//thunks
export const loginInRequestTC = (data: LoginDataType) => (dispatch: Dispatch<ThunkType>) => {
    dispatch(setStatusAC('loading'));
    LoginAPI.loginIn(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoginIn(true));
                dispatch(setStatusAC('succeeded'));
            }
            else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleNetworkServerError(dispatch, error)
        })
}

export const loginOutRequestTC = () => (dispatch: Dispatch<ThunkType>) => {
    dispatch(setStatusAC('loading'));
    LoginAPI.loginOut()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoginIn(false));
                dispatch(setStatusAC('succeeded'));
            }
            else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleNetworkServerError(dispatch, error)
        })
}
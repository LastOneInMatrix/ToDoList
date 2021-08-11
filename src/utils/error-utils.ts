import {setErrorAC, setStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ThunkType} from "../state/tasks-reducer";
import {ResponseType} from '../API/TodoListAPI'

export const handleServerAppError = <D>(dispatch: Dispatch<ThunkType>, data: ResponseType<D>) => {
    data.messages.length ? dispatch(setErrorAC(data.messages[0])) : dispatch(setErrorAC('some Error'))
    dispatch(setStatusAC('failed'))

}

export const handleNetworkServerError = (dispatch: Dispatch<ThunkType>, error: any) => {
    dispatch(setErrorAC(error.message ? error.toString(): 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}
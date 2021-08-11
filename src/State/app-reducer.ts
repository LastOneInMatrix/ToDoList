export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type InitialStateType = {
    status: RequestStatusType;
    error: string | null
}


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}  as const);


export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
type ActionsType = SetErrorActionType| SetStatusActionType

//ctr alt v - создать переменную на основе данных
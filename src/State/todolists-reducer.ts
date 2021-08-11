import {TodoListAPI, TodoListType} from '../API/TodoListAPI'
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof changeTodolistEntityStatusAC>


type ThunkType = TodoListActionsType | SetErrorActionType | SetStatusActionType
const initialState: Array<TodolistDomainType> =  []


export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.newTodoList, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET_TODO_LISTS': {
          return action.todoLists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle'}))
          }
        case 'CHANGE-TODOLIST-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (newTodoList: TodoListType) => ({ type: 'ADD-TODOLIST', newTodoList} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>({ type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>({ type: 'CHANGE-TODOLIST-STATUS', id, status} as const)
export const setTodoLists = (todoLists: Array<TodoListType>) => ({
    type: 'SET_TODO_LISTS',
    todoLists: todoLists
} as const)

export const fetchTodoListThunk = () => (dispatch: Dispatch<ThunkType>) => {
    dispatch(setStatusAC('loading'))
    TodoListAPI.getTodoList().then(res => {
        dispatch(setTodoLists(res.data))
        dispatch(setStatusAC('succeeded'))
    })
}
export const removeTodolistTCreator = (todolistId: string) => (dispatch: Dispatch<ThunkType>) => {
            dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
            dispatch(setStatusAC('loading'))
            TodoListAPI.deleteTodolist(todolistId)
                .then(res => {
                    if(res.data.resultCode === 0) {
                        dispatch(removeTodolistAC(todolistId));
                        dispatch(setStatusAC('succeeded'))
                    }
            })
}
export const addTodolistTCreator = (title: string) => (dispatch: Dispatch<ThunkType>) => {
    dispatch(setStatusAC('loading'))
        TodoListAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                }
                else {
                    res.data.messages.length ? dispatch(setErrorAC(res.data.messages[0])) :dispatch(setErrorAC('some Error'))
                }
            })
}
export const changeTodolistTitleTCreator = (id: string, title: string) => (dispatch: Dispatch<ThunkType>) => {
            TodoListAPI.updateTodolist(id, title)
                .then(res => {
                    console.log(res.data);
                    dispatch(changeTodolistTitleAC(id, title))
                })
}



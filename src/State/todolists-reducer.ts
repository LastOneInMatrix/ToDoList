import {TodoListAPI, TodoListType} from '../API/TodoListAPI'
import {Dispatch} from "redux";

export type TaskActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoLists>

const initialState: Array<TodolistDomainType> =  []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TaskActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType  = {...action.newTodoList, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET_TODO_LISTS': {
          return action.todoLists.map(tl => {
              return {
                  ...tl,
                  filter: 'all'
              }
          })

        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (newTodoList: TodoListType) => ({ type: 'ADD-TODOLIST', newTodoList} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>({ type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodoLists = (todoLists: Array<TodoListType>) => ({
    type: 'SET_TODO_LISTS',
    todoLists: todoLists
} as const)

export const fetchTodoListThunk = () => {
    return (dispatch: Dispatch) => TodoListAPI.getTodoList().then(res => {
        dispatch(setTodoLists(res.data))
    })
}
export const removeTodolistTCreator = (todolistId: string) => {
        return (dispatch: Dispatch) => {
            TodoListAPI.deleteTodolist(todolistId)
                .then(res => {
                    if(res.data.resultCode === 0) {
                        dispatch(removeTodolistAC(todolistId));
                    }
                })
        }
}
export const addTodolistTCreator = (title: string) => {
    return (dispatch: Dispatch) => {
        TodoListAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistTitleTCreator = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
            TodoListAPI.updateTodolist(id, title)
                .then(res => {
                    console.log(res.data);
                    dispatch(changeTodolistTitleAC(id, title))
                })
    }
}


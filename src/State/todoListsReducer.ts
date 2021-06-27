import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

//const
const DELETE_TODOLIST = 'DELETE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_FILTER = 'CHANGE_FILTER';
const CHANGE_TITLE = 'CHANGE_TITLE';


//type
export type DeleteTodoListAT = {
    type: 'DELETE_TODOLIST';
    todoListID: string;
};
export type AddTodoListAT = {
    type: 'ADD_TODOLIST';
    todoListId: string;
    title: string
};

type ChangeFilterAT = {
    type: 'CHANGE_FILTER';
    filter: FilterValuesType;
    todoListId: string;
};
type ChangeTitleAT = {
    type: 'CHANGE_TITLE';
    todoListID: string;
    newTitle: string;
};

export type ActionType = ChangeFilterAT | AddTodoListAT | DeleteTodoListAT | ChangeTitleAT;

//mainReducer
export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case DELETE_TODOLIST:
            return todoLists.filter((el) => {
                return el.id !== action.todoListID;
            })
        case ADD_TODOLIST:
            const todoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            };
            return [...todoLists, todoList]
        case CHANGE_FILTER:
            return todoLists.map((tl) => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case CHANGE_TITLE:
            let todoListWithNewTitle = todoLists.find(tl => tl.id === action.todoListID);
            if (todoListWithNewTitle) {
                todoListWithNewTitle.title = action.newTitle;
            }
            return [...todoLists]
        default:
            return todoLists;
    }
};


//ActionCreators
export const removeTodoListAC = (todoListID: string): DeleteTodoListAT => {
  return {
      type: DELETE_TODOLIST,
      todoListID
  }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: ADD_TODOLIST,
        todoListId: v1(),
        title
    }
}
export const changeFilterAC = (filter: FilterValuesType, todoListId: string): ChangeFilterAT => {
    return {
        type: CHANGE_FILTER,
        filter: filter,
        todoListId
    }
}
export const changeTitleAC = (todoListID: string, newTitle: string): ChangeTitleAT => {
    return {
        type: CHANGE_TITLE,
        todoListID,
        newTitle,
    }
}
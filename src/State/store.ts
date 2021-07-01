import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./Reducers/TodoLisrReducer/todoListsReducer";
import {tasksReducer} from "./Reducers/TasksReducer/tasksReducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
//type storeType = typeof  store;


//@ts-ignore
window.store = store;

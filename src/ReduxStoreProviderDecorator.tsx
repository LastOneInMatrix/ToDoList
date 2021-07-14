import React, {useCallback} from 'react';
import {Provider} from "react-redux";
import {AppStateType, store} from "./State/store";
import {v1} from "uuid";
import {todoListsReducer} from "./State/Reducers/TodoLisrReducer/todoListsReducer";
import {tasksReducer} from "./State/Reducers/TasksReducer/tasksReducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator =(storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

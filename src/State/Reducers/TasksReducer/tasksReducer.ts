import {TasksStateType} from "../../../AppWithRedux";
import {v1} from "uuid";
import {TaskType} from "../../../Components/TodoList/TodoList";
import {AddTodoListAT, DeleteTodoListAT} from "../TodoLisrReducer/todoListsReducer";

//const
const DELETE_TASK = 'DELETE_TASK' as const;
const ADD_TASK = 'ADD_TASK' as const;
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS' as const;
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE' as const;


//type
type RemoveTasksType = {
    type: typeof DELETE_TASK;
    taskId: string;
    toDoListId: string;
};

type AddTasksType = {
    type: typeof ADD_TASK;
    toDoListId: string;
    title: string;
};

type ChangeTaskStatus = {
    type: typeof CHANGE_TASK_STATUS;
    toDoListId: string;
    taskId: string;
    isDone: boolean
};

type ChangeTaskTitleType = {
    type: typeof CHANGE_TASK_TITLE;
    toDoListId: string;
    taskId: string;
    newTittle: string;
};
export type ActionType = RemoveTasksType | AddTasksType | ChangeTaskStatus  | ChangeTaskTitleType | AddTodoListAT | DeleteTodoListAT;


export const TODOLIST_ID = v1();
export const TODOLIST_ID_1 = v1();

const initialState: TasksStateType = {
    [TODOLIST_ID]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    [TODOLIST_ID_1]: [
        {id: v1(), title: "Купить кошку", isDone: true},
        {id: v1(), title: "Бросить курить", isDone: true},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case DELETE_TASK: {
            return {
            ...state,
                    [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.taskId)
            }
        }
        case ADD_TASK: {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone:  false
            }
            return {
                ...state,
                [action.toDoListId]: [newTask,...state[action.toDoListId]]
            }
        }
        case CHANGE_TASK_STATUS: {
             return {
                 ...state,
                 [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ?  {...t, isDone: action.isDone } : t)
             }
        }
        case CHANGE_TASK_TITLE:
            console.log(state, action.toDoListId)
              return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ?  {...t, title: action.newTittle } : t)
            }

        case "ADD_TODOLIST":
            return {[action.todoListId]: [], ...state };
        case "DELETE_TODOLIST":
            const copyState = {...state}
            delete copyState[action.todoListID];
            return copyState;
        default:
            return state
    }
};


//ActionCreators
export const removeTaskAC = (taskId: string, toDoListId: string): RemoveTasksType => {
  return {
      type: DELETE_TASK, taskId, toDoListId
  }
}
export const addTaskAC = (title: string, toDoListId: string): AddTasksType => {
    return {
        type: ADD_TASK, toDoListId, title
    }
}
export const changeTaskStatusAC = (toDoListId: string, taskId: string, isDone: boolean): ChangeTaskStatus => {
    return {
        type: CHANGE_TASK_STATUS, toDoListId, taskId, isDone
    }
}
export const changeTaskTitleAC = (toDoListId: string, taskId: string, newTittle: string): ChangeTaskTitleType => {
    return {
        type: CHANGE_TASK_TITLE, toDoListId, taskId, newTittle
    }
}
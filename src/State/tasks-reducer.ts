import {TasksStateType} from '../app/App';
import {v1} from 'uuid';
import {
    TaskActionsType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, TodoListAPI, UpdateTaskModelType} from '../API/TodoListAPI'
import {Dispatch} from "redux";
import {AppRootStateType, getStateType} from "./store";




const initialState: TasksStateType = {
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType ): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.newTodoList.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET_TODO_LISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
};

//ActionCreators
export const removeTaskAC = (taskId: string, todolistId: string) =>({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const UpdateTaskAC = (taskId: string, model: UpdateDomainTaskModelTypeForMe, todolistId: string) =>({type: 'UPDATE_TASK', model, todolistId, taskId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string ) => ({type: 'SET-TASKS', tasks, todolistId} as const)


//thunk
export const fetchTaskTCreator = (todoListId: string) =>  (dispatch: Dispatch, getState: getStateType) => {
        TodoListAPI.getTask(todoListId)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todoListId))
            })
}
export const deleteTaskTCreator = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
            TodoListAPI.deleteTask(todolistId, taskId)
                .then(res => {
                    if(res.data.resultCode === 0) {
                        dispatch(removeTaskAC(taskId,todolistId))
                    }
                })
}
export const addTaskThunkTCreator = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
        TodoListAPI.createTask(todolistId, title)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                }
                else {
                  throw new Error
                }
            })
            .catch(err => console.log(err))
}
export const updateTaskTitleTCreator = (taskId: string, changeDomainModel:UpdateDomainTaskModelTypeForMe, todolistId: string) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(ts => ts.id === taskId);
        if(!task) {
            console.warn('thomthing wrong');
            return;
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate:  task.startDate,
            deadline:  task.deadline,
            ...changeDomainModel
        }

        TodoListAPI.updateTask(todolistId,taskId, model)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(UpdateTaskAC(taskId, model, todolistId));
                }
            })
}



export type UpdateDomainTaskModelTypeForMe = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?:  null | string
    deadline?:  null | string
}
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof UpdateTaskAC>
    | ReturnType<typeof setTaskAC>
    | TaskActionsType




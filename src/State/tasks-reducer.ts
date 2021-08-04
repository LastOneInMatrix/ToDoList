import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, TodoListAPI, UpdateTaskModelType} from '../API/TodoListAPI'
import {Dispatch} from "redux";
import {AppRootStateType, getStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskType = {
    type: 'UPDATE_TASK',
    taskId: string,
    model: UpdateDomainTaskModelTypeForMe,
    todolistId: string
}

export type SetTaskActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListActionType
    | SetTaskActionType

const initialState: TasksStateType = {
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task

            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [newTask, ...tasks];

            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE_TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

            const copyState = {...state}
                copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const UpdateTaskAC = (taskId: string, model: UpdateDomainTaskModelTypeForMe, todolistId: string): UpdateTaskType => {
    return {type: 'UPDATE_TASK', model, todolistId, taskId}
}
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string ): SetTaskActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


//thunk
export const fetchTaskTCreator = (todoListId: string) => {
    return (dispatch: Dispatch, getState: getStateType) => {
        TodoListAPI.getTask(todoListId)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todoListId))
            })

    }
}
export const deleteTaskTCreator = (taskId: string, todolistId: string) => {
        return (dispatch: Dispatch) => {
            TodoListAPI.deleteTask(todolistId, taskId)
                .then(res => {
                    if(res.data.resultCode === 0) {
                        dispatch(removeTaskAC(taskId,todolistId))
                    }
                })
        }
}
export const addTaskThunkTCreator = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
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
}



export type UpdateDomainTaskModelTypeForMe = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?:  null | string
    deadline?:  null | string
}

export const updateTaskTitleTCreator = (taskId: string, changeDomainModel:UpdateDomainTaskModelTypeForMe, todolistId: string) => {
        return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
}


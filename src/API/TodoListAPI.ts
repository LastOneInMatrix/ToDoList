import axios from "axios";

//types
export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type ItemTodoListType = {item: TodoListType};
type ItemTaskType = {item: TaskType}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate:  null | string
    deadline:  null | string
}
type GetTaskResponseType = {
    error: string,
    totalCount: number,
    items: TaskType[]
}
type ResponseType<T = {}> = {
    "data": T
    "messages": Array<string>,
    "fieldsErrors"?:Array<string>,
    "resultCode": number
};
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null | string
    deadline: null | string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


//api
const settings = {
    withCredentials: true,
    headers: {
        'api-key': '84c6307f-7e5a-4636-a098-ea1e899ebf82'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export const TodoListAPI = {
    getTodoList() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodolist(title: string) {
       return instance.post<ResponseType<ItemTodoListType>>('todo-lists',{title})
    },
    updateTodolist(toDoListId: string,title: string ) {

       return  instance.put<ResponseType>(
            `todo-lists/${toDoListId}`,
            {title})
    },
    deleteTodolist(toDoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}`)
    },
    getTask(toDoListId: string) {
       return instance.get<GetTaskResponseType>(`todo-lists/${toDoListId}/tasks`)
    },
    deleteTask(toDoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
    },
    createTask(toDoListId: string, title: string) {
        return instance.post<ResponseType<ItemTaskType>>(`todo-lists/${toDoListId}/tasks`, {title})
    },
    updateTask(toDoListId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType<ItemTaskType>>(`/todo-lists/${toDoListId}/tasks/${taskId}`, {...model})
    }
}
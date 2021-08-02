import axios from "axios";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ItemTodoListType = {item: TodoListType};
type ItemTaskType = {item: TaskType}


type ResponseType<T = {}> = {
    "data": T
    "messages": Array<string>,
    "fieldsErrors"?:Array<string>,
    "resultCode": number
};
type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate:  null | string
    deadline:  null | string
}


type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    error: string,
    totalCount: number,
    items: TaskType[]
}

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
    changeTaskTitle(toDoListId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType<ItemTaskType>>(`/todo-lists/${toDoListId}/tasks/${taskId}`, {...model})
    }
}
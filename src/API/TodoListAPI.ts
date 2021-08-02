import axios from "axios";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ItemType = {item: TodoListType};

type ResponseType<T> = {
    "data": T
    "messages": Array<string>,
    "fieldsErrors":Array<string>,
    "resultCode": number
};

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '84c6307f-7e5a-4636-a098-ea1e899ebf82'
    }
}


export const TodoListAPI = {
    getTodoList() {
        return axios.get<Array<TodoListType>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
    },
    createTodolist(title: string) {
       return axios.post<ResponseType<ItemType>>('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, settings)
    },
    updateTodolist(toDoListId: string,title: string ) {
       return  axios.put<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`,
            {title},
            settings)
    },
    deleteTodolist(toDoListId: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`, settings)
    }
}
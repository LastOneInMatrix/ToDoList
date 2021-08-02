import React, {useEffect, useState} from 'react'

import {TodoListAPI, TodoListType} from "../../API/TodoListAPI";

export default {
    title: 'API'
}


export const GetTodoLists = () => {
    const [state, setState] = useState<Array<TodoListType>>([])
    useEffect(() => {
        console.log('useEffect')
        TodoListAPI.getTodoList().then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>([])
    useEffect(() => {
        const title = (Math.random() * 100).toString();
        TodoListAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = 'eace05a9-9e3d-420d-a482-49edb0038af7'
            TodoListAPI.deleteTodolist(toDoListId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = '8a8c774b-4485-4611-82d5-001d0e5318c5'
        const title = Math.random() * 100;
        TodoListAPI.updateTodolist(toDoListId, title.toString())
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

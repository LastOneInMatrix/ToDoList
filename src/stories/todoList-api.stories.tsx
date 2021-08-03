import React, {ChangeEvent, useEffect, useState} from 'react'
import {TodoListAPI, TodoListType} from "../API/TodoListAPI";
import {v1} from "uuid";

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

    return (
        <div>
            {state.length ?
                state.map(it => {
                    return <pre>
                        <p>Title: {it.title}</p>
                        <b>id: {it.id}</b>
                    </pre>
                })
                : <pre> [ empty ]</pre>
            }
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>([]);
    const [title, setTitle] = useState<string>('');
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const createTodoWithLocalTitle = () => {
        TodoListAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }
    // useEffect(() => {
    //     const title = (Math.random() * 100).toString();
    //     TodoListAPI.createTodolist(title)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])


    return <div>
        <input type={'text'} placeholder={'title for todoList'} value={title} onChange={changeTitleHandler}/>
        <button onClick={createTodoWithLocalTitle}>Send Data</button><br/>

        <pre>
           {JSON.stringify(state).split(':{').join(':{\n')}
       </pre>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState<string>('')
    const deleteTodoHandler = () => {
        const toDoListId = todoId;
        TodoListAPI.deleteTodolist(toDoListId)
            .then(res => {
                setState(res.data.resultCode)
            })
    }


    return (
        <>
            <input type={'text'} value={todoId} onChange={(e)=>{setTodoId(e.currentTarget.value)}}/>
            <button onClick={deleteTodoHandler}>Delete</button>
            <pre> {JSON.stringify(state)}</pre>
        </>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);

    const [todos, setTodos] = useState<Array<TodoListType>>([]);
    const [currentId, setCurrentId] = useState<any>(todos[0]?.id)
    const [inputValue,setInputValue] = useState<string>('');
    useEffect(() => {
        TodoListAPI.getTodoList().then(res => {
            setTodos(res.data)
            setCurrentId(res.data[0].id)
        })
    }, [state])

    const updateTodoTitleHandler = () => {
        const toDoListId = currentId;
        const title = inputValue;
        TodoListAPI.updateTodolist(toDoListId, title)
            .then(res => {
                setState(res.data)
            })
    }
    const handleIdChange = (e: ChangeEvent<HTMLSelectElement>) => {

        setCurrentId(e.target.value)
    }


    return <div>
        <label>
            Chose todos for change Title:
            <select value={currentId} onChange={handleIdChange}> //TODO УЗНАТЬ ПОЧЕМУ ПЕРВЫЙ РАЗ НЕ РИСУЕТСЯ
                {todos.map((todo, i) => {
                    return <option key={v1()} value={todo.id}>{todo.id}</option>
                })}
            </select>
        </label>

        <pre>Response: {JSON.stringify(state)}</pre>
        <label>
            Title:
            <input value={inputValue} onChange={(e) => {setInputValue(e.currentTarget.value)}}/>
        </label>

        <button onClick={updateTodoTitleHandler}>Обновить</button>
    </div>
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<string>('')

    const chooseTodo = () => {
        const todoListId = inputValue;
        TodoListAPI.getTask(todoListId).then(res => {
            setState(res.data.items)
        })
    }

    return <div>
        <input value={inputValue} onChange={e => setInputValue(e.currentTarget.value)}/>
        <button onClick={chooseTodo}>chooseTodo</button>
        <pre>{JSON.stringify(state)}</pre>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [inputValue, setInputValue] = useState<{ todoListId: string, taskId: string }>({todoListId: '', taskId: ''})
    const deleteTaskHandler = () => {
        const todoListId = inputValue.todoListId;
        const taskId = inputValue.taskId;
        TodoListAPI.deleteTask(todoListId, taskId).then(res => {
            setState(res.data)
        })
    }

    return <div>
        <input placeholder={'for todo todoListId'} value={inputValue.todoListId} onChange={e => setInputValue({...inputValue, todoListId:e.currentTarget.value})}/>
        <input placeholder={'for task taskId'} value={inputValue.taskId} onChange={e => setInputValue({...inputValue, taskId:e.currentTarget.value})}/>
        <button onClick={deleteTaskHandler}>Delete Task</button>
        <pre>Response: {JSON.stringify(state)}</pre>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [inputValue, setInputValue] = useState<{ id: string, title: string }>({id: '', title: ''})

    const changeTitleForTodo = () => {
        const todoListId = inputValue.id;
        const title = inputValue.title;
        TodoListAPI.createTask(todoListId, title).then(res => {
            setState(res.data)
        })
    }

    return <div>
        <input placeholder={'for todo id'} value={inputValue.id} onChange={e => setInputValue({...inputValue, id:e.currentTarget.value})}/>
        <input placeholder={'for task title'} value={inputValue.title} onChange={e => setInputValue({...inputValue, title:e.currentTarget.value})}/>
        <button onClick={changeTitleForTodo}>chooseTodo</button>
        <pre>Task: {state ? state?.data?.item?.title : 'null'} with id:  {state? (state.data.item.id + ' was created'): 'null was not created yet'} </pre>

        <pre>

            Response:{JSON.stringify(state)}
        </pre>
    </div>
}

export const ChangeTaskTitleTask = () => {
    const [state, setState] = useState<any>(null)
    const [inputValue, setInputValue] = useState<{ todoListId: string, taskId: string, taskTitle: string}>({todoListId: '', taskId: '', taskTitle: ''});

    const changeTaskHandler =() => {
        const {todoListId, taskId, taskTitle} = inputValue;
        const model = {
            title: taskTitle,
            description: 'string',
            completed: false,
            status: 0,
            priority: 0,
            startDate:  null,
            deadline:  null
        }
        TodoListAPI.changeTaskTitle(todoListId, taskId, model).then(res => {
            setState(res.data)
        })
    }

    return <div>

        <label>
            TodoId: <input placeholder={'for todo todoListId'} value={inputValue.todoListId} onChange={e => setInputValue({...inputValue, todoListId:e.currentTarget.value})}/>
        </label>

        <label>
            TaskId: <input placeholder={'for task taskId'} value={inputValue.taskId} onChange={e => setInputValue({...inputValue, taskId:e.currentTarget.value})}/>
        </label>
        <label>
            Title: <input placeholder={'for task Title'} value={inputValue.taskTitle} onChange={e => setInputValue({...inputValue, taskTitle:e.currentTarget.value})}/>
        </label>


        <button onClick={changeTaskHandler}>ChangeTask Task</button>
        <pre>Response: {JSON.stringify(state)}</pre>
    </div>
}
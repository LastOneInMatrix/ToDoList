import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodolistTCreator,
    changeTodolistFilterAC, changeTodolistTitleTCreator,
    fetchTodoListThunk,
    FilterValuesType, removeTodolistTCreator,
    TodolistDomainType
} from "../../state/todolists-reducer";
import {addTaskThunkTCreator, deleteTaskTCreator, updateTaskTitleTCreator} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../API/TodoListAPI";
import {TasksStateType} from "../../app/App";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../AddItemForms/AddItemForm";
import {Todolist} from "./Todolist";
 type TodolistContainerPropsType = {

 }
export const TodolistContainer: React.FC<TodolistContainerPropsType> = (props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoListThunk())
        // fetchTodoListThunk(dispatch)
    }, [])
    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(deleteTaskTCreator(id,todolistId))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskThunkTCreator(title, todolistId)
        dispatch(thunk);
    }, []);
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskTitleTCreator(id, {status}, todolistId);
        dispatch(action);
    }, []);
    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        const thunk = updateTaskTitleTCreator(taskId, {title}, todolistId);
        dispatch(thunk);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);
    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTCreator(id);
        dispatch(thunk);
    }, []);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTCreator(id, title))
    }, []);
    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTCreator(title);
        dispatch(thunk);
    }, [dispatch]);
     return <>
         <Grid container style={{padding: "20px"}}>
             <AddItemForm addItem={addTodolist}/>
         </Grid>
         <Grid container spacing={3}>
             {
                 todolists.map(tl => {
                     let allTodolistTasks = tasks[tl.id];

                     return <Grid item key={tl.id}>
                         <Paper style={{padding: "10px"}}>
                             <Todolist
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={allTodolistTasks}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodolist={removeTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}
                             />
                         </Paper>
                     </Grid>
                 })
             }
         </Grid>
        </>
}
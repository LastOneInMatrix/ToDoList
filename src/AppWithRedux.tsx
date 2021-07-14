import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from './Components/TodoList/TodoList';

import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleAC,
    removeTodoListAC,

} from "./State/Reducers/TodoLisrReducer/todoListsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

} from "./State/Reducers/TasksReducer/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./State/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType
};
export  type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks);
    const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);
    const dispatch = useDispatch();

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId,todoListID));
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID));
    }, [dispatch])
    const changeStatus = useCallback((toDoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(toDoListId, taskId, isDone))
    }, [dispatch])
    const changeTitle = useCallback((toDoListId: string, taskId: string, newTittle: string) => {
        debugger;
        dispatch(changeTaskTitleAC(toDoListId, taskId, newTittle));
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTitleAC(todoListID, newTitle));
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeFilterAC(filter, todoListId))
    }, [dispatch])

    const deleteTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID));
    },[dispatch]);
    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action);
    },[dispatch])



//UI



    const todoListComponents = todoLists.map((tl, i) => {
        const tasksForTodolist = tasks[tl.id];

        return <Grid item key={i}>
            <Paper elevation={6} style={{padding: '15px', textAlign: 'center'}}>
                <TodoList
                    todoListID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    deleteTodoList={deleteTodoList}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTitle={changeTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>   A
            <Container fixed>
                <Grid container style={{padding: '20px'}} spacing={1}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;

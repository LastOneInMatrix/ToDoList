import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../Components/Todolist/Todolist';
import {AddItemForm} from '../Components/AddItemForms/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTCreator,
    changeTodolistFilterAC,
    changeTodolistTitleTCreator,
    fetchTodoListThunk,
    FilterValuesType,
    removeTodolistTCreator,
    TodolistDomainType
} from '../state/todolists-reducer'
import {addTaskThunkTCreator, deleteTaskTCreator, updateTaskTitleTCreator} from '../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskStatuses, TaskType} from '../API/TodoListAPI'
import {TodolistContainer} from "../Components/Todolist/TodolistContainer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistContainer/>
            </Container>
        </div>
    );
}

export default App;

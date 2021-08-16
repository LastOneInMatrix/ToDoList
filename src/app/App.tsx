import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Route, Switch, Redirect} from "react-router-dom";
import {Menu} from '@material-ui/icons';
import {TaskType} from '../API/TodoListAPI'
import {TodolistContainer} from "../Components/Todolist/TodolistContainer";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "../state/app-reducer";
import {BrowserRouter} from "react-router-dom";
import {Login} from "../Components/Login/Login";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    return (
        <BrowserRouter>
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
                    {status === 'loading' && <LinearProgress color="secondary" /> }
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistContainer/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
                <ErrorSnackBar/>
            </div>
        </BrowserRouter>

    );
}

export default App;

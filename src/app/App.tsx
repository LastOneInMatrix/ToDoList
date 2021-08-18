import React, {useCallback, useEffect} from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography, CircularProgress} from '@material-ui/core';
import {Route, Switch, Redirect} from "react-router-dom";
import {Menu} from '@material-ui/icons';
import {TaskType} from '../API/TodoListAPI'
import {TodolistContainer} from "../Components/Todolist/TodolistContainer";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initializeTC, RequestStatusType} from "../state/app-reducer";
import {BrowserRouter} from "react-router-dom";
import {Login} from "../Components/Login/Login";
import {loginOutRequestTC} from "../Components/Login/loginReducer";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.appReducer.isInitialized);
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoginIn);

   const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeTC());
    },[]);
    const logoutHandler = useCallback(() => {
        dispatch(loginOutRequestTC());
    },[])
    if(!isInitialized) {
       return  <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
           <CircularProgress />...Loading
        </div>

    }
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
                        {isLoginIn && <Button color="inherit" onClick={logoutHandler}>LogOut</Button>}
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    {status === 'loading' && <LinearProgress color="secondary" /> }
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistContainer/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                        <Redirect from={'/TodoList'} to={'/'}/>
                        <Redirect from={'*'} to={'/404'}/>

                    </Switch>
                </Container>
                <ErrorSnackBar/>
            </div>
        </BrowserRouter>

    );
}

export default App;

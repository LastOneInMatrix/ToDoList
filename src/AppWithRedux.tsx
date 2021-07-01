import React from 'react';
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

function AppWithRedux() {

    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks);
    const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);
    const dispatch = useDispatch();







    function removeTask(taskId: string, todoListID: string) {
        dispatch(removeTaskAC(taskId,todoListID));
    }
    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title,todoListID));
    }
    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(toDoListId, taskId, isDone))
    }
    function changeTitle(toDoListId: string, taskId: string, newTittle: string) {
        debugger;
        dispatch(changeTaskTitleAC(toDoListId, taskId, newTittle));
    }

    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action);
    };
    const deleteTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID));
    };
    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatch(changeTitleAC(todoListID, newTitle));
    }
    function changeFilter(filter: FilterValuesType, todoListId: string) {
        dispatch(changeFilterAC(filter, todoListId))
    }




//UI
    function getFilteredTasks(tl: TodoListType) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => !t.isDone)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }


    const todoListComponents = todoLists.map((tl, i) => {
        const tasksForTodolist = getFilteredTasks(tl);

        return <Grid item>
            <Paper elevation={6} style={{padding: '15px', textAlign: 'center'}}>
                <TodoList
                    key={i}
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
            </AppBar>
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

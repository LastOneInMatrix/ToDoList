import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './Components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./State/Reducers/todoListsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./State/Reducers/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType
};
export  type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithUseReducers() {
    const TODOLIST_ID = v1();
    const TODOLIST_ID_1 = v1();


    let [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: TODOLIST_ID, title: 'What to learn', filter: 'all'},
        {id: TODOLIST_ID_1, title: 'What To Buy', filter: 'all'},
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [TODOLIST_ID]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [TODOLIST_ID_1]: [
            {id: v1(), title: "Купить кошку", isDone: true},
            {id: v1(), title: "Бросить курить", isDone: true},
        ]
    })


    function removeTask(taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId,todoListID));
    }
    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title,todoListID));
    }
    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(toDoListId, taskId, isDone))
    }
    function changeTitle(toDoListId: string, taskId: string, newTittle: string) {
        dispatchToTasks(changeTaskTitleAC(toDoListId, taskId, newTittle));
    }

    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTasks(action);
        dispatchToTodoList(action);
    };
    const deleteTodoList = (todoListID: string) => {

        dispatchToTodoList(removeTodoListAC(todoListID));
        dispatchToTasks(removeTodoListAC(todoListID));
    };
    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchToTodoList(changeTitleAC(todoListID, newTitle));
    }
    function changeFilter(filter: FilterValuesType, todoListId: string) {
        dispatchToTodoList(changeFilterAC(filter, todoListId))
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

export default AppWithUseReducers;

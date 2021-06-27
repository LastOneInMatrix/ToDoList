import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType
};
export  type TasksStateType = {
    [key: string]: Array<TaskType>;
};
function App() {
    const TODOLIST_ID = v1();
    const TODOLIST_ID_1 = v1();
    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: TODOLIST_ID, title: 'What to learn', filter: 'all'},
        {id: TODOLIST_ID_1, title: 'What To Buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskId);
        setTasks({...tasks});
    }
    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title, isDone: false};
        const copyTask = {...tasks};
        copyTask[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks(copyTask);
    }
    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let copyTasks = {...tasks};
        copyTasks[todoListID] = copyTasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t);
        setTasks(copyTasks);
    }
    function changeTitle(taskId: string, todoListID: string, newTitle: string) {
        let copyTasks = {...tasks};
        copyTasks[todoListID] = copyTasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t);
        setTasks(copyTasks);
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        };
        setTodoList([todoList, ...todoLists]);
        setTasks({...tasks, [todoList.id]: []})
    }
    const deleteTodoList = (todoListID: string) => {

        const filteredTodoLists = todoLists.filter((el) => {
            return el.id !== todoListID;
        });
        setTodoList(filteredTodoLists);

        const copyTasks = {...tasks}
        delete copyTasks[todoListID];
        setTasks(copyTasks);
    }
    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            console.log(todoLists);
            setTodoList([...todoLists]);
        }
    }
    function changeFilter(filter: FilterValuesType, todoListId: string) {
        setTodoList(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filter} : tl));
        // {...tl, filter: filter} РАЗВЕРНУТЬ СВОЙСТВА ОБЪЕКТА, И ЗАМЕНИТЬ ЗНАЧЕНИЕ СВОЙСТВА filter
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

export default App;

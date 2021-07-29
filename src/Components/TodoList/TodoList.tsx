import React, {useCallback} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType} from '../../AppWithRedux';
import {Button, IconButton} from "@material-ui/core";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import {Task} from "./Task/Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    todoListID: string;
    title: string;
    tasks: Array<TaskType>;
    deleteTodoList: (todoListID: string) => void;
    changeTodoListTitle: (todoListID: string, newTitle: string) => void;
    changeFilter: (filter: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeTaskStatus: (toDoListId: string, taskId: string, isDone: boolean) => void;
    changeTitle: (todoListID: string, taskId: string, newTitle: string) => void;
    removeTask: (taskId: string, todoListId: string) => void;
    filter: FilterValuesType;
}

export const TodoList = React.memo(function(props: PropsType) {

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todoListID),[props.changeFilter, props.todoListID]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todoListID),[props.changeFilter, props.todoListID]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todoListID),[props.changeFilter, props.todoListID]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    },[props.addTask, props.todoListID]);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle);
    },[props.changeTodoListTitle, props.todoListID]);

    function getFilteredTasks(tasks:  Array<TaskType>) {
        switch (props.filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks.map(t => t);
        }
    }
    const tasks = getFilteredTasks(props.tasks);
    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={() => props.deleteTodoList(props.todoListID)}>
                <HighlightOffTwoToneIcon color={'secondary'}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: 'none', padding: '5px'}}>
            {
                tasks.map((t) => <Task key={t.id} t={t} removeTask={props.removeTask} changeTitle={props.changeTitle} changeTaskStatus={props.changeTaskStatus} todoListID={props.todoListID}/>)
            }
        </ul>
        <div>
            <Button color={'default'}
                    variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})




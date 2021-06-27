import React, {ChangeEvent} from 'react';
import TodoListStyle from './TodoList.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType} from '../../App';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import DeleteIcon from '@material-ui/icons/Delete';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    todoListID: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todoListId: string) => void;
    deleteTodoList: (todoListID: string) => void;
    changeFilter: (filter: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    changeTitle: (taskId: string, todoListID: string, newTitle: string) => void;
    changeTodoListTitle: (todoListID: string, newTitle: string) => void;
    filter: FilterValuesType;
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle);
    }

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
                props.tasks.map(t => {
                    const  onClickHandler = () => props.removeTask(t.id, props.todoListID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        props.changeTitle(t.id, props.todoListID, newTitle);
                    }

                    return <li key={t.id} className={t.isDone ? TodoListStyle['is-done'] : ""}>
                        <Checkbox
                            size={'small'}
                            color={"primary"}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />

                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon color={'secondary'}/>
                        </IconButton>
                    </li>
                })
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
}



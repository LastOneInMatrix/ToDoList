import React, {ChangeEvent, useCallback} from "react";
import TodoListStyle from "../TodoList.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "../TodoList";

type TaskPropsType = {
    changeTaskStatus: (toDoListId: string, taskId: string, isDone: boolean) => void;
    changeTitle: (todoListID: string, taskId: string, newTitle: string) => void;
    removeTask: (taskId: string, todoListId: string) => void;
    t: TaskType;
    todoListID: string;
};
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.t.id, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, props.t.id, e.currentTarget.checked);
    }
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        props.changeTitle(props.todoListID, props.t.id, newTitle);
    }, [props.changeTitle, props.todoListID, props.t.id]);

    return <li key={props.t.id} className={props.t.isDone ? TodoListStyle['is-done'] : ""}>
        <Checkbox
            size={'small'}
            color={"primary"}
            onChange={onChangeHandler}
            checked={props.t.isDone}
        />

        <EditableSpan title={props.t.title} changeTitle={changeTaskTitleHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon color={'secondary'}/>
        </IconButton>
    </li>
})
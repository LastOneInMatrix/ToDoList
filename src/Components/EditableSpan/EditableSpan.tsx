import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string;
    changeTitle: (newTitle: string) => void;
    // taskId: string;
    // todoListID: string; //todo лучше перенести на вверх что бы меньше пропсов принимать
}

export function     EditableSpan({title, ...props}: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false); // TODO вторая фнункция созданная useState нужна для того что бы менять стейт
    const [localTitle, setLocalTitle] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setLocalTitle(title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.changeTitle(localTitle);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value);
        // props.changeTitle(props.taskId, props.todoListID, e.currentTarget.value) //TODO при таком раскладе каждый введеный символ будет отправляться на серва, а правильно было бы сделать единожды сохраненные Title state отправить на сервак при Blur
    };

    return (
        editMode ?
            <span>
                  {/*<input type={'text'} value={localTitle} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/>*/}
                 <TextField id="outlined-basic" label="Задача" size={'small'} value={localTitle} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}  />
            </span>

            :
            <span onDoubleClick={activateEditMode}>{title}</span>

    )
}
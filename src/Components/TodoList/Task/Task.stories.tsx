import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {Task} from './Task';
import {action} from "@storybook/addon-actions";

const changeTaskStatus = action('Status changed');
const changeTitle = action('Title changed');
const removeTask = action('Delete task');

export default {
    title: 'Todolist/Task',
    component: Task,
    changeTaskStatus: {
        onClick: {
            description: 'Test onClick',
        }
    },
    args: {
        changeTaskStatus: changeTaskStatus,
        changeTitle:  changeTitle,
        removeTask: removeTask
    }
} as ComponentMeta<typeof Task>;





const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    t: {id: '1', isDone: true, title: 'изучить JS'},
    todoListID: 'TodolistID'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    t: {id: '1', isDone: false, title: 'Имя Таски'},
    todoListID: 'TodolistID'
};
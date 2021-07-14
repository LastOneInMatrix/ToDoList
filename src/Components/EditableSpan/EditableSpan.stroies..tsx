import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import {Task} from "../TodoList/Task/Task";

export default {
    title: 'Todolist/EditableSpan',
    component: Task,
    changeTaskStatus: {
        onClick: {
            description: 'Test onClick',
        }
    },

} as ComponentMeta<typeof Task>;
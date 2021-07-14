import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';

import {AddItemForm, AddItemFromPropsType} from './AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Test onClick',
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>
// const Template: Story<AddItemFromPropsType> = (args) => <AddItemForm {...args}/> старый вариант

export const AddItemFormStories = Template.bind({});

AddItemFormStories.args = {
    addItem: action('Button was clicked')
};
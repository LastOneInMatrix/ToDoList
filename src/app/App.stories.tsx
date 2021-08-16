import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";

import App from './App';
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/AppWithRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) =><App /> ;


export const AppReduxWithProvider = Template.bind({});
AppReduxWithProvider.args = {};
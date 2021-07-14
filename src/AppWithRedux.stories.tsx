import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";

import {AppWithRedux} from './AppWithRedux';
import {store} from "./State/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) =><AppWithRedux /> ;


export const AppReduxWithProvider = Template.bind({});
AppReduxWithProvider.args = {};
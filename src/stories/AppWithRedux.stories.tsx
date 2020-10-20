import React from "react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator.stories";

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

const changeCallBack = action("Change callback")

export const AppWithReduxExample = () => {
    return <AppWithRedux/>
}
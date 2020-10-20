import React from "react";
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callBack = action("Button + was pressed")

export function AddItemFormExample () {
    return <AddItemForm addItem={callBack}/>

}
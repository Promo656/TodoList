import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component:EditableSpan
}

const changeCallBack=action("Change callback")

export const EditableSpanExample=()=>{
    return <EditableSpan title={"Start title"} onChange={changeCallBack}/>
}
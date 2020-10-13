import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange:(value:string)=>void
}

export const EditableSpan=React.memo((props: EditableSpanType)=> {
    console.log("EditableSpan is rendering")

    let [editMode, setEditMode]=useState(false)
    let [title, setTitle]=useState("")

    let activateEditMode=()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateViewMode=()=> {
        setEditMode(false)
        props.onChange(title)
    }
    let onChangeTitleHandler=(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)

    return editMode
        ? <TextField onChange={onChangeTitleHandler} onBlur={activateViewMode}  value={title} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})
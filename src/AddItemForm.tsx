import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";

type AddItemFormProps = {
    addItem: (title: string, ) => void
}

export function AddItemForm(props: AddItemFormProps) {

    let [taskName, setTaskName] = useState("")
    let [error, setError] = useState<string | null>(null)

    function addTask() {
        if (taskName.trim()) {
            props.addItem(taskName.trim())
            setTaskName("")
        } else {
            setError("Title is required")
        }
    }

    function onTaskNameChange(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value)
        setError(null)
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                label={"Title"}
                value={taskName}
                onChange={onTaskNameChange}
                onKeyPress={onAddTaskKeyPressed}
                error={!!error}
                helperText={error}
            />
            <IconButton color={"primary"} onClick={addTask}>
            <AddBox/>
            </IconButton>
        </div>
    )
}
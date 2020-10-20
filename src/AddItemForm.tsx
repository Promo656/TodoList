import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log("AddItemForm is rendering")

    const [newTasksTitle, setNewTasksTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTasks()
        }
    }
    const addTasks = () => {
        if (newTasksTitle.trim() !== "") {
            props.addItem(newTasksTitle)
            setNewTasksTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"Name"}
                value={newTasksTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTasks} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})
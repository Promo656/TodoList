import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../App.module.css";

type AddItemFormType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormType) {

    const [newTasksTitle, setNewTasksTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
            <input value={newTasksTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ""}
            />
            <button onClick={addTasks}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input
                value={taskName}
                onChange={onTaskNameChange}
                onKeyPress={onAddTaskKeyPressed}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskTitleCallBack = action("Task changed")
const changeTaskStatusCallBack = action("Status changed")
const removeTaskCallBack = action("Task deleted")

export const TaskExample = (props: any) => {
    return <>
        <Task
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}
            removeTask={removeTaskCallBack}
            todoListId={"TodoListId1"}
            task={{id: "123", title: "Bread", isDone: false}}
        />
        <Task
            changeTaskTitle={changeTaskTitleCallBack}
            changeTaskStatus={changeTaskStatusCallBack}
            removeTask={removeTaskCallBack}
            todoListId={"TodoListId2"}
            task={{id: "1234", title: "Milk", isDone: true}}
        />
    </>
}
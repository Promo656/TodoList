import React from "react";

export type BtnType = {
    name: string
    className: string
    disabled: boolean
    onClick: () => void

}

export function Btn(props: BtnType) {
    return (
        <button
            disabled={props.disabled}
            className={props.className}
            onClick={props.onClick}>{props.name}
        </button>
    )
}
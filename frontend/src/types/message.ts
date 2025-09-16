import React from "react";

export type TMessage = {
    role: string
    content: string;
    name: string;
}

export type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>
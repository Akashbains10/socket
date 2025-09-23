import React from "react";

export type TMessage = {
    role: string
    message: string;
    media?: string[];
    createdAt: string;
}

export type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>
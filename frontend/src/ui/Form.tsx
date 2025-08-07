import React from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';


type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>
    children: React.ReactNode
    methods: UseFormReturn<TFormValues>
}

const Form = <TFormValues extends FieldValues>({
    children,
    onSubmit,
    methods
}: FormProps<TFormValues>) => {
    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            {children}
        </form>
    )
}

export default Form

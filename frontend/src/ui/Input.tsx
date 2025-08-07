import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';


type InputProps<T extends FieldValues> = {
    type?: 'text' | 'email' | 'password' | 'number';
    className?: string;
    name: Path<T>,
    error: FieldError | undefined,
    label?: string,
    control: Control<T>,
    sx?: React.CSSProperties;
}

const Input = <T extends FieldValues>({
    type = 'text',
    sx,
    name,
    className = '',
    error,
    label,
    control
}: InputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
                return (
                    <>
                        <InputLabel sx={{ color: '#09090b' }}>{label}</InputLabel>
                        <TextField
                            sx={sx}
                            type={type}
                            className={`w-full ${className}`}
                            error={!!error}
                            helperText={
                                <span className='text-red-500 text-sm'>{error?.message}</span>
                            }
                            value={value ?? ''}
                            onChange={(e) => {
                                onChange(e.target.value);
                            }}
                        />
                    </>
                )
            }}
        />
    )
}

export default Input

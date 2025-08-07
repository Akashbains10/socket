import Spinner from "./Spinner";

type TButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Button = ({
    loading,
    type = 'button',
    className = '',
    children,
    onClick,
    ...props
}: TButtonProps) => {
    return (
        <button
            type={type}
            {...props}
            disabled={loading}
            onClick={onClick}
            className={`w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                } ${className}`}
        >
            {loading && (
                <Spinner />
            )}
            {children}
        </button>

    )
}

export default Button

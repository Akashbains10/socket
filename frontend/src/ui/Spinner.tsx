const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
            >
                <circle
                    className="opacity-100"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="90"
                    strokeDashoffset="30"
                />
            </svg>
        </div>
    )
}

export default Spinner

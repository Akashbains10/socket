
type SearchProps = {
    id: string;
    value: string | number;
    onChange: any;
    placeholder?: string
}

const SearchBar = ({
    id,
    value = '',
    onChange,
    placeholder = 'Search name or email'
}: SearchProps) => {
    return (
        <input
            type="text"
            id={id}
            value={value}
            placeholder={placeholder}
            className="px-4 py-2 w-full focus:outline-none"
            onChange={onChange}
        />
    )
}

export default SearchBar

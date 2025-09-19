const ChatSkeleton = () => {
    return (
        <div className="flex items-center gap-3 p-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="flex-1">
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
        </div>
    )
}

export default ChatSkeleton

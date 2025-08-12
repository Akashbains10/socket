import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import { LogOut, MessageSquarePlus, Settings } from 'lucide-react';



const ChatLeftSidebar = () => {
    return (
        <div className="w-1/4 bg-gray-100 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-300 flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-colors"
                    aria-label="New Chat"
                >
                    <MessageSquarePlus size={20} />
                </button>
            </div>
            <div className="p-4">
                <div className="bg-gray-200 rounded-md">
                    <input
                        type="text"
                        id="search-box"
                        placeholder="Search name or email"
                        className="px-4 py-2 w-full focus:outline-none"
                    />
                </div>
            </div>

            {/* Chats Listing */}

            <div className="flex-1 overflow-y-auto">
                {new Array(3).fill(null).map((item) => (
                    <div className="my-2">
                        <div className="px-5 py-4 border-b border-gray-200 hover:bg-[#E6E6FA] transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <Avatar
                                    sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
                                    variant="rounded"
                                >
                                    A
                                </Avatar>

                                <div className="flex flex-col flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium">
                                            Akash Bains
                                        </span>
                                        <span className="text-xs text-gray-500">2:45 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 truncate">
                                            Hey! How are you?
                                        </span>
                                        <span className="text-xs text-white font-medium min-w-[20px] h-[20px] bg-green-500 flex items-center justify-center rounded-full">
                                            1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 mt-auto">
                <div className="flex justify-between items-center">
                    <button className="flex gap-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors">
                        <Settings size={18} />
                        <span className="text-sm font-medium">Settings</span>
                    </button>

                    <button className="flex gap-2 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 cursor-pointer transition-colors">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatLeftSidebar

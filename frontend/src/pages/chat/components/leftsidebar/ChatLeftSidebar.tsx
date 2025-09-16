import { useState } from "react";
import { MessageSquarePlus, Settings, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";
import UsersList from "./UsersList";
import { useAllChats } from "@/api/users/getAllChats";



const mockChats = [
  { name: "Akash Bains", time: "2:45 PM", message: "Hey! How are you?", unreadCount: 1 },
  { name: "John Doe", time: "1:15 PM", message: "Let's meet tomorrow", unreadCount: 0 },
  { name: "Jane Smith", time: "Yesterday", message: "Thanks for the update", unreadCount: 2 }
];

const newChats = [
  { name: "Roman Reigns", time: "2:45 PM", message: "Tap here to start chat", unreadCount: 0 },
  { name: "Seth Rollins", time: "1:15 PM", message: "Tap here to start chat", unreadCount: 0 },
  { name: "Randy Orton", time: "Yesterday", message: "Tap here to start chat", unreadCount: 0 }
];



// const mockChats: TChats[] = []

const ChatLeftSidebar = () => {
  const { data: chats } = useAllChats();
  const [search, setSearch] = useState<string>("");
  const [isNewChat, setIsNewChat] = useState<boolean>(false);


  return (
    <div className="w-1/4 bg-gray-100 flex flex-col border-gray-300 shadow-md">
      <SidebarHeader
        title={isNewChat ? 'New Chat' : 'Chats'}
        actionIcon={<MessageSquarePlus size={20} />}
        onActionClick={() => setIsNewChat(!isNewChat)}
      />

      <div className="p-4">
        <div className="bg-gray-200 rounded-md">
          <SearchBar id="search-box" value={search} onChange={setSearch} />
        </div>
      </div>

      {isNewChat ? <UsersList /> : <ChatList chatLists={chats ?? []} />}

      <SidebarFooter
        actions={[
          { label: "Settings", icon: <Settings size={18} />, onClick: () => console.log("Settings clicked") },
          { label: "Logout", icon: <LogOut size={18} />, onClick: () => console.log("Logout clicked"), color: "text-red-700", hoverColor: "bg-red-200" }
        ]}
      />
    </div>
  );
};

export default ChatLeftSidebar;

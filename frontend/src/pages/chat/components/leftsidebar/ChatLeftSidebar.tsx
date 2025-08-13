import { useState } from "react";
import { MessageSquarePlus, Settings, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import ChatList, { TChats } from "./ChatList";


// const mockChats = [
//   { name: "Akash Bains", time: "2:45 PM", message: "Hey! How are you?", unreadCount: 1 },
//   { name: "John Doe", time: "1:15 PM", message: "Let's meet tomorrow", unreadCount: 0 },
//   { name: "Jane Smith", time: "Yesterday", message: "Thanks for the update", unreadCount: 2 }
// ];

const mockChats: TChats[] = []

const ChatLeftSidebar = () => {
  const [search, setSearch] = useState<string>("");
  const [isNewChat, setIsNewChat] = useState<boolean>(false);


  return (
    <div className="w-1/4 bg-gray-100 flex flex-col">
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

      <ChatList chatLists={mockChats} />

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

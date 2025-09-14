import ChatListItem from "./ChatListItem";
import nomessage from '@/assets/message.png'
import { ChatData } from "@/types/chat";

const ChatList = ({
  chatLists
}: {
  chatLists: ChatData[]
}) => {

  if (chatLists?.length === 0) {
    return (
      <div className="flex flex-col h-100 gap-2 justify-center items-center">
        <img src={nomessage} alt="no-message" />
        <span className="font-medium text-lg">No Chat found</span>
        <p className="text-gray-600 text-sm">Tap the + icon above to chat with your friends.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {chatLists?.map((chat, idx) => (
        <div key={idx} className="my-2">
          <ChatListItem {...chat} />
        </div>
      ))}
    </div>
  );
};

export default ChatList;

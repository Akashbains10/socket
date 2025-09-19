import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatHeader } from "./rightContent/ChatHeader";
import { useSocket } from "@/provider/SocketProvider";
import { MessageArea } from "./rightContent/MessageArea";
import { MessageInput } from "./rightContent/MessageInput";
import { User } from "@/types/user";
import { useAuth } from "@/provider/AuthProvider";
import { TMessage } from "@/types/message";

const ChatMainContent = () => {
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useSocket();

  const selectedChat = useSelector((state: RootState) => state.counter.selectedChat);
  const [messages, setMessages] = useState<TMessage[]>([]);

  const isNewChat = selectedChat && !("users" in selectedChat);

  const receiver: User | undefined = useMemo(() => {
    if (!selectedChat || !user?._id) return undefined;

    if (isNewChat) return selectedChat as User;

    return selectedChat.users.find((u) => u._id !== user._id);

  }, [selectedChat, user?.id, isNewChat]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  useEffect(() => {
    if (!isConnected || !socket) return;

    // request messages
    socket.emit("get_messages_list", { chatId: selectedChat?._id });

    // listen for response
    socket.on("all_messages", (data) => {
      if (Array.isArray(data) && data?.length > 0) {
        const formatMsg = data?.map(({ sender, message, createdAt }) => ({
          role: sender?._id !== user?._id ? 'receiver' : 'sender',
          message,
          createdAt
        }))
        setMessages(formatMsg);
      }
    });

    socket.on("new_message", ({ sender, message, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        {
          role: sender?._id !== user?._id ? 'receiver' : 'sender',
          message,
          createdAt
        },
      ]);
    });

    return () => {
      socket.off("all_messages");
      socket.off("new_message"); // cleanup listener
    };
  }, [socket, isConnected, selectedChat]);

  if (!receiver && messages?.length === 0) {
    return (
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <span className="text-gray-500 text-2xl font-semibold"> No messages yet...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="h-screen flex-1">
      <div className="h-full flex flex-col justify-between">
        <ChatHeader receiver={receiver} />
        <MessageArea bottomRef={ref} messages={messages} />
        <MessageInput receiver={receiver} selectedChat={selectedChat} isNewChat={isNewChat ?? false} setMessages={setMessages} />
      </div>
    </div>
  )
}

export default ChatMainContent

import { useState } from "react"
import ChatHeader from "./rightContent/ChatHeader"
import MessageArea from "./rightContent/MessageArea"
import MessageInput from "./rightContent/MessageInput"
import { TMessage } from "@/types/message"

const defaultValue = [
    { role: "sender", name: "Seth Rollins", content: "Hi Roman" },
    { role: "sender", name: "Seth Rollins", content: "Hey Roman, I just wanted to check in with you today. It’s been a busy week, and I thought it would be nice to catch up for a bit. Work has been hectic, but I’m managing to keep things on track with some extra effort. I’ve also been spending more time at the gym lately, trying to stay consistent with my routine. It really helps me clear my head. How have things been on your side? I’d love to hear what’s new with you and how everything is going in your personal and professional life these days." },
    { role: "receiver", name: "Roman Reigns", content: "Hey Roman, I just wanted to check in with you today. It’s been a busy week, and I thought it would be nice to catch up for a bit. Work has been hectic, but I’m managing to keep things on track with some extra effort. I’ve also been spending more time at the gym lately, trying to stay consistent with my routine. It really helps me clear my head. How have things been on your side? I’d love to hear what’s new with you and how everything is going in your personal and professional life these days." },
  ];

const ChatMainContent = () => {
  const [messages, setMessages] = useState<TMessage[]>(defaultValue)
  return (
    <div className="h-screen flex-1">
      <div className="h-full flex flex-col justify-between">
        <ChatHeader />
        <MessageArea messages={messages} />
        <MessageInput setMessages={setMessages} />
      </div>
    </div>
  )
}

export default ChatMainContent

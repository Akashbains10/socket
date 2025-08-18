import ChatHeader from "./rightContent/ChatHeader"
import MessageArea from "./rightContent/MessageArea"
import MessageInput from "./rightContent/MessageInput"

const ChatMainContent = () => {
  return (
    <div className="h-screen flex-1">
      <div className="h-full flex flex-col justify-between">
        <ChatHeader />
        <MessageArea/>
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatMainContent

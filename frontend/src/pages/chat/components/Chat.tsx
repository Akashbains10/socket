import ChatLeftSidebar from "./leftsidebar/ChatLeftSidebar"
import ChatMainContent from "./ChatMainContent"

const Chat = () => {

  return (
    <div className="h-screen flex">
      <ChatLeftSidebar />
      <ChatMainContent />
    </div>
  )
}

export default Chat

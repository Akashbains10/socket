import { Image, Smile, MapPin, Mic } from "lucide-react";
import { useState } from "react";
import { ArrowUpCircle } from "lucide-react";
import { TDispatch, TMessage } from "@/types/message";


const MessageInput = ({ setMessages }: { setMessages: TDispatch<TMessage[]> }) => {

  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    if (message.trim()) {
      setMessages(prev => ([...prev, { role: 'sender', name: 'Roman Reigns', content: message }]));
    }
    setMessage("");
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    debugger;
    if (e.key === 'Enter') {
      e.preventDefault();
      onSendMessage();
      setMessage("");
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-sm">

        {/* Left-side icons */}
        <button className="p-1 hover:bg-gray-200 rounded-full transition">
          <Smile className="text-gray-500" size={20} />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded-full transition">
          <Image className="text-gray-500" size={20} />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded-full transition">
          <MapPin className="text-gray-500" size={20} />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 px-2"
        />

        {/* Right-side action (Mic or Send) */}
        <button
          className="p-2 hover:bg-gray-200 rounded-full transition flex items-center justify-center"
        >
          {message.trim() ? (
            <ArrowUpCircle
              className="text-blue-600 transition-all duration-200"
              size={22}
              onClick={onSendMessage}
              role="button"
              tabIndex={0}
            />

          ) : (
            <Mic className="text-gray-500 transition-all duration-200" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

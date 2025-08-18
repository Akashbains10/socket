import { Image, Smile, MapPin, Mic } from "lucide-react";
import { useState } from "react";
import { ArrowUpCircle } from "lucide-react";


const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    
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
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 px-2"
        />

        {/* Right-side action (Mic or Send) */}
        <button
          className="p-2 hover:bg-gray-200 rounded-full transition flex items-center justify-center"
        >
          {message.trim() ? (
            <ArrowUpCircle className="text-blue-600 transition-all duration-200" size={22} onClick={sendMessage} />

          ) : (
            <Mic className="text-gray-500 transition-all duration-200" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

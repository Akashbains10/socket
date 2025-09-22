import React, { useRef, useState } from "react";
import { TDispatch, TMessage } from "@/types/message";
import { ArrowUpCircle } from "lucide-react";
import { useSocket } from "@/provider/SocketProvider";
import { Image, Smile, MapPin, Mic } from "lucide-react";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { ChatData } from "@/types/chat";



const MessageInputComponent = ({
  receiver,
  isNewChat,
  selectedChat,
  setMessages
}: {
  receiver: User | undefined
  isNewChat: boolean
  selectedChat: ChatData | null
  setMessages: TDispatch<TMessage[]>
}) => {
  const { socket } = useSocket();
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const onSendMessage = () => {
    if (!socket) return;
    if (message.trim()) {
      setMessages(prev => ([...prev, { role: 'sender', message: message, createdAt: new Date().toISOString() }]));
    }
    const payload = {
      chatId: !isNewChat ? selectedChat?._id : undefined,
      receiverId: receiver?._id,
      message: message.trim()
    }
    socket.emit('send_message', payload);
    setMessage("");
    queryClient.invalidateQueries(['chats', 'list'] as InvalidateQueryFilters<readonly unknown[]>)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSendMessage();
      setMessage("");
    }
  }

  const startRecording = async () => {
    debugger;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log(stream, 'stream value')
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    // mediaRecorderRef.current.onstop = () => {
    //   const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    //   setAudioBlob(audioBlob);
    // };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-sm">

        {/* Left-side icons */}
        <button className="p-1 hover:bg-gray-200 rounded-full transition">
          <Smile className="text-gray-500" size={20} onClick={() => setIsEmojiOpen(!isEmojiOpen)} />
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
            <Mic
              size={20}
              className="text-gray-500 transition-all duration-200"
              // onClick={()=>console.log('this event is triggered')}
              onClick={startRecording}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export const MessageInput = React.memo(MessageInputComponent);

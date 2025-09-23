import React, { useCallback, useRef, useState } from "react";
import { TDispatch, TMessage } from "@/types/message";
import { ArrowUpCircle, Image, Smile, MapPin, Mic } from "lucide-react";
import { useSocket } from "@/provider/SocketProvider";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { ChatData } from "@/types/chat";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { MediaPreviewList } from "./MediaPreviewList";
import { DropOverlay } from "./DropOverlay";
import { uploadFile } from "@/api/users/uploadFile";

const MessageInputComponent = ({
  receiver,
  isNewChat,
  selectedChat,
  setMessages
}: {
  receiver: User | undefined;
  isNewChat: boolean;
  selectedChat: ChatData | null;
  setMessages: TDispatch<TMessage[]>;
}) => {
  const { socket } = useSocket();
  const {
    files,
    previews,
    setFiles,
    setPreviews,
    handleChange,
    fileAndPreviewSetter,
    clear
  } = useMediaUpload();
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const onSendMessage = async () => {
    if (!socket) return;
    if (!message.trim() && files.length === 0) return;

    setMessages(prev => ([
      ...prev,
      {
        role: 'sender',
        message: message,
        media: [],
        createdAt: new Date().toISOString()
      }]));

    let payload = {
      chatId: !isNewChat ? selectedChat?._id : undefined,
      receiverId: receiver?._id,
      message: message.trim(),
      media: [],
    };

    if (files?.length > 0) {
      const res = await uploadFile(files);
      if (res && res?.data?.length > 0) {
        payload.media = res?.data
      }
    }

    socket.emit('send_message', payload);
    setMessage("");
    setFiles([]);
    setPreviews([]);
    queryClient.invalidateQueries(['chats', 'list'] as InvalidateQueryFilters<readonly unknown[]>);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSendMessage();
      setMessage("");
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setTimeout(() => setIsDragOver(false), 100);
  }, []);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    const filesArr = Array.from(droppedFiles);
    if (filesArr?.length > 0) fileAndPreviewSetter(filesArr);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      className="relative bg-white border-t border-gray-200 px-4 py-3"
    >
      {/* Drop Overlay */}
      <DropOverlay isDragging={isDragOver} />

      {/* Media previews (if any) */}
      <MediaPreviewList previews={previews} files={files} onRemove={clear} />

      {/* Input UI */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        {/* Left icons */}
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

        {/* File Upload */}
        <input type="file" multiple id="upload-input" onChange={handleChange} hidden />
        <label htmlFor="upload-input" className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition">
          <Image className="text-gray-500" size={20} />
        </label>

        {/* Send or Mic */}
        <button className="p-2 hover:bg-gray-200 rounded-full transition flex items-center justify-center">
          {message.trim() || files?.length > 0 ? (
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
              onClick={startRecording}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export const MessageInput = React.memo(MessageInputComponent);

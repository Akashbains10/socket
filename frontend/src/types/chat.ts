import { ChatMessage } from "./chat.message";

export type TChats = {
    status: string;
    data: ChatData;
}

export type ChatData = {
    _id: string,
    users: string[],
    chatName: string,
    isGroupChat: boolean,
    lastMessage: ChatMessage,
    createdAt: string,
}
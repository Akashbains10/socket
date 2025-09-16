import { ChatMessage } from "./chat.message";
import { User } from "./user";

export type TChats = {
    status: string;
    data: ChatData;
}

export type ChatData = {
    _id: string,
    users: User[],
    chatName: string,
    isGroupChat: boolean,
    lastMessage: ChatMessage,
    createdAt: string,
}
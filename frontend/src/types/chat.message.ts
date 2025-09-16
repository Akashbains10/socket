export type ChatMessage = {
    _id: string;
    chatId: string;
    message: string;
    sender: Sender;
    unreadBy: string[];
    createdAt: string;
    updatedAt: string;
};

export type TChats = {
    status: string;
    data: ChatMessage[];
}

export type Sender = {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    socketId: string;
    isOnline: boolean;
    phoneNumber: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
};
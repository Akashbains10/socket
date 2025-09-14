import { QueryClientConfig, useQuery } from '@tanstack/react-query';
import Axios from '@/utils/axios';
import { ChatData } from '@/types/chat';

export const getAllChats = async (): Promise<ChatData[]> => {
    const response = await Axios.get('/users/chats');
    return response?.data;
};


type QueryType = {
    config?: QueryClientConfig;
}

export const useAllChats = ({config}: QueryType = {}) => {
    return useQuery({
        queryKey: ['chats', 'list'],
        queryFn: getAllChats,
        ...config
    });
};
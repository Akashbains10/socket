import { useQuery } from '@tanstack/react-query';
import Axios from '@/utils/axios';

export const getAllChats = () => {
    return Axios.get('/v1/users/chats');
};

export const useAllChats = () => {
    return useQuery({
        queryKey: ['chats', 'list'],
        queryFn: getAllChats
    });
};
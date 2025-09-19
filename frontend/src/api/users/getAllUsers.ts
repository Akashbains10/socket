import { useInfiniteQuery } from '@tanstack/react-query';
import Axios from '@/utils/axios';
import { IUserList } from '@/types/user';

export interface IUserQueryParams {
  search?: string;
  limit?: number;
}

const getAllUsers = async ({ pageParam = 1, queryKey }: any): Promise<IUserList> => {
  const [, , params] = queryKey;
  const response = await Axios.get<IUserList>('/users/list', {
    params: {
      limit: params?.limit ?? 5,
      page: pageParam,
      search: params?.search ?? "",
    },
  });
  return response.data;
};

export const useAllUsers = (params?: IUserQueryParams) => {
  return useInfiniteQuery<IUserList>({
    queryKey: ['users', 'list', params],
    queryFn: getAllUsers,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

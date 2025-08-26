import { useInfiniteQuery } from '@tanstack/react-query';
import Axios from '@/utils/axios';
import { User } from '@/types/user';

export interface IUserApiResponse {
  status: number;
  message: string;
  data: User[];
  page: number;
  limit: number;
  total: number;
}

export interface IUserQueryParams {
  search?: string;
  limit?: number;
}

const getAllUsers = async ({ pageParam = 1, queryKey }: any): Promise<IUserApiResponse> => {
  const [, , params] = queryKey;
  const response = await Axios.get('/users/list', {
    params: {
      limit: params?.limit ?? 5,
      page: pageParam,
      search: params?.search ?? "",
    },
  });
  return response.data;
};

export const useAllUsers = (params?: IUserQueryParams) => {
  return useInfiniteQuery<IUserApiResponse>({
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

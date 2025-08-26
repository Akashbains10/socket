export interface User {
  _id: string;
  fullName: string;
  email: string;
  socketId: string | null;
  isOnline: boolean;
  phoneNumber: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserList {
  status: number;
  message: string;
  data: User[];
  page: number;
  limit: number;
  total: number;
}
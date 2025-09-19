import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";
import moment from "moment";
import { ChatData } from "@/types/chat";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "@/store/counterSlice";
import { useAuth } from "@/provider/AuthProvider";
import React, { useMemo } from "react";
import { User } from "@/types/user";

type ChatListItemProps = ChatData;

const ChatListItemComponent = ({
  ...props
}: ChatListItemProps) => {

  const { user } = useAuth();
  const dispatch = useDispatch();
  const { lastMessage, createdAt, users } = props;

  const unreadCount = 3;

  const receiver: User | undefined = useMemo(() => {
    if (!user?._id) return undefined;
    return users.find((u) => u._id !== user._id);
  }, [users, user?._id]);

  return (
    <div
      className="px-5 py-4 border-b border-gray-200 hover:bg-[#E6E6FA] transition-colors cursor-pointer"
      onClick={() => dispatch(setSelectedChat(props))}
    >
      <div className="flex items-center gap-4">
        <Avatar
          sx={{ bgcolor: indigo['A200'], width: 48, height: 48 }}
          variant="rounded"
        >
          {receiver?.fullName?.charAt(0).toUpperCase()}
        </Avatar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{receiver?.fullName}</span>
            <span className="text-xs text-gray-500">{moment(createdAt).fromNow()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate">{lastMessage?.message}</span>
            {unreadCount > 0 && (
              <span className="text-xs text-white font-medium min-w-[20px] h-[20px] bg-green-500 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatListItem = React.memo(ChatListItemComponent);

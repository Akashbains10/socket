import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";
import { TChats } from "./ChatList";

type ChatListItemProps = TChats & {
  onClick?: () => void;
};

const ChatListItem = ({
  name,
  time,
  message,
  unreadCount = 0,
  onClick
}: ChatListItemProps) => {
  return (
    <div
      className="px-5 py-4 border-b border-gray-200 hover:bg-[#E6E6FA] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Avatar
          sx={{ bgcolor: indigo['A200'], width: 48, height: 48 }}
          variant="rounded"
        >
          {name.charAt(0)}
        </Avatar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate">{message}</span>
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

export default ChatListItem;

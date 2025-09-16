import Avatar from "@mui/material/Avatar";
import { indigo } from "@mui/material/colors";
import { User } from "@/types/user";
import moment from 'moment';

type ChatListItemProps = User & {
  onClick?: () => void;
  unreadCount?: number;
};

const UsersListItem = ({
  fullName,
  createdAt,
  phoneNumber,
  isOnline,
  unreadCount = 0,
  onClick
}: ChatListItemProps) => {

  return (
    <div
      className="px-5 py-4 border-b border-gray-200 hover:bg-[#E6E6FA] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="relative inline-block">
          <Avatar
            sx={{ bgcolor: indigo['A200'], width: 48, height: 48 }}
            variant="rounded"
          >
            {fullName.charAt(0)}
          </Avatar>

          {/* Status Dot (scales with Avatar size) */}
          <span
            className={`absolute bottom-[-4%] right-[-7%] h-[20%] w-[20%] rounded-full border-none 
             ${isOnline ? "bg-green-500" : "bg-red-500"}`}
          ></span>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{fullName}</span>
            <span className="text-xs text-gray-500">
              {moment(createdAt).format("hh:mm A")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate">{phoneNumber}</span>
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

export default UsersListItem;

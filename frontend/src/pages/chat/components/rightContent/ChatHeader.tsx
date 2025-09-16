import { useAuth } from "@/provider/AuthProvider";
import { ChatData } from "@/types/chat";
import { User } from "@/types/user";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import { indigo } from "@mui/material/colors";
import { Search, Phone, Video, MoreVertical } from "lucide-react";
import React, { useMemo, useState } from "react";

const ChatHeaderComponent = ({
  receiver
}:{
  receiver: User | undefined
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-gray-100">
      <div className="p-4 border-b border-gray-300 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Avatar
            sx={{
              bgcolor: indigo["A200"],
              width: 48,
              height: 48,
            }}
            variant="rounded"
          >
            {receiver?.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {receiver?.fullName}
            </h2>
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${receiver?.isOnline ? "bg-green-500 animate-pulse-status" : "bg-red-500"
                  }`}
              ></span>
              <span
                className={`text-sm ${receiver?.isOnline ? "text-green-600" : "text-red-600"
                  }`}
              >
                {receiver?.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Collapse orientation="horizontal" in={showSearch} timeout={400}>
            <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-white shadow-sm">
              <Search className="text-gray-600 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm flex-1"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </Collapse>

          {!showSearch && (
            <Search
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          )}

          {/* Call */}
          <Phone className="text-gray-600 hover:text-gray-800 cursor-pointer" />

          {/* Video */}
          <Video className="text-gray-600 hover:text-gray-800 cursor-pointer" />

          {/* Menu */}
          <MoreVertical className="text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export const ChatHeader = React.memo(ChatHeaderComponent);

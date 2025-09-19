import { TMessage } from "@/types/message";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import React from "react";

const ReceiverMessageComponent = ({ content }: {content: TMessage }) => {
    return (
        <div className="flex flex-col items-start gap-2 mb-4">
            <div className="flex items-end gap-2">
                <Avatar sx={{ width: 36, height: 36 }} />
                <div className="bg-white shadow-sm p-3 rounded-lg rounded-bl-none max-w-md">
                    <p className="text-sm text-gray-800">{content?.message}</p>
                    {/* <span className="text-xs text-gray-500">{name}</span> */}
                </div>
            </div>

            <div className="text-xs text-gray-400">
                {moment(content?.createdAt)?.fromNow()}
            </div>
        </div>
    );
};

export const ReceiverMessage = React.memo(ReceiverMessageComponent);

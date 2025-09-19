import { TMessage } from "@/types/message";
import moment from "moment";
import React from "react";

const SenderMessageComponent = ({ content }: { content: TMessage }) => {
  return (
    <div className="flex flex-col items-end mb-4">
      <div className="bg-indigo-500 text-white shadow-sm p-3 rounded-lg rounded-br-none max-w-md">
        <p className="text-sm">{content?.message}</p>
      </div>
      <div className="text-xs text-gray-400">
        {moment(content?.createdAt).fromNow()}
      </div>
    </div>
  );
};

export const SenderMessage = React.memo(SenderMessageComponent);

import React from "react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { TMessage } from "@/types/message";

const MessageAreaComponent = ({
  bottomRef,
  messages
}: {
  bottomRef: React.RefObject<HTMLDivElement | null>,
  messages: TMessage[]
}) => {
  
  return (
    <div className="h-full p-4 overflow-y-auto">
      {messages?.map(({role, message}, index) =>
        role === 'sender' ? (
          <SenderMessage key={index}  content={message} />
        ) : (
          <ReceiverMessage key={index} content={message} />
        )
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export const MessageArea = React.memo(MessageAreaComponent);

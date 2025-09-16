import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { TMessage } from "@/types/message";
import React from "react";

const MessageAreaComponent = ({
  bottomRef,
  messages
}: {
  bottomRef: React.RefObject<HTMLDivElement | null>,
  messages: TMessage[]
}) => {

  return (
    <div className="h-full p-4 overflow-y-auto">
      {messages?.map((msg, index) =>
        msg.role === "sender" ? (
          <SenderMessage key={index} name={msg.name} content={msg.content} />
        ) : (
          <ReceiverMessage key={index} content={msg.content} />
        )
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export const MessageArea = React.memo(MessageAreaComponent);

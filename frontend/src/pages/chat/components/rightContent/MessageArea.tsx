import React from "react";
import { TMessage } from "@/types/message";
import { SenderMessage } from "./SenderMessage";
import { ReceiverMessage } from "./ReceiverMessage";

const MessageAreaComponent = ({
  bottomRef,
  messages
}: {
  bottomRef: React.RefObject<HTMLDivElement | null>,
  messages: TMessage[]
}) => {
  
  return (
    <div className="h-full p-4 overflow-y-auto">
      {messages?.map((content, index) =>
        content?.role === 'sender' ? (
          <SenderMessage key={index} content={content} />
        ) : (
          <ReceiverMessage key={index} content={content} />
        )
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export const MessageArea = React.memo(MessageAreaComponent);

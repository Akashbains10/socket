import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { TMessage } from "@/types/message";

const MessageArea = ({ messages }: { messages: TMessage[] }) => {

  return (
    <div className="h-full p-4 overflow-y-auto">
      {messages.map((msg, index) =>
        msg.role === "sender" ? (
          <SenderMessage key={index} name={msg.name} content={msg.content} />
        ) : (
          <ReceiverMessage key={index} content={msg.content} />
        )
      )}
    </div>
  );
};

export default MessageArea;

import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";

const MessageArea = () => {
  const messages = [
    { role: "sender", name: "Seth Rollins", content: "Hi Roman" },
    { role: "sender", name: "Seth Rollins", content: "Hey Roman, I just wanted to check in with you today. It’s been a busy week, and I thought it would be nice to catch up for a bit. Work has been hectic, but I’m managing to keep things on track with some extra effort. I’ve also been spending more time at the gym lately, trying to stay consistent with my routine. It really helps me clear my head. How have things been on your side? I’d love to hear what’s new with you and how everything is going in your personal and professional life these days." },
    { role: "receiver", name: "Roman Reigns", content: "Hey Roman, I just wanted to check in with you today. It’s been a busy week, and I thought it would be nice to catch up for a bit. Work has been hectic, but I’m managing to keep things on track with some extra effort. I’ve also been spending more time at the gym lately, trying to stay consistent with my routine. It really helps me clear my head. How have things been on your side? I’d love to hear what’s new with you and how everything is going in your personal and professional life these days." },
  ];

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

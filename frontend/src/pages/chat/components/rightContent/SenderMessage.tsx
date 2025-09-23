import { TMessage } from "@/types/message";
import moment from "moment";
import React from "react";

const SenderMessageComponent = ({ content }: { content: TMessage }) => {
  return (
    <div className="flex flex-col items-end mb-4">
      <div className="bg-indigo-500 text-white shadow-sm p-3 rounded-lg rounded-br-none max-w-md space-y-2">
        {/* Text message */}
        {content?.message && <p className="text-sm">{content.message}</p>}

        {/* Media attachments */}
        {content.media?.map((url, index) => {
          const isImage = url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
          const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
          const isPDF = url.match(/\.pdf$/i);

          return (
            <div key={index}>
              {isImage && (
                <img src={url} alt="Media" className="w-40 h-auto rounded-md" />
              )}
              {isVideo && (
                <video controls className="w-40 h-auto rounded-md">
                  <source src={url} />
                </video>
              )}
              {isPDF && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                  📄 Open PDF
                </a>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-400">
        {moment(content?.createdAt).fromNow()}
      </div>
    </div>
  );
};

export const SenderMessage = React.memo(SenderMessageComponent);

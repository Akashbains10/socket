import React from "react";
import { FileText, Video, File as FileIcon } from "lucide-react"; // or use custom icons

interface MediaPreviewListProps {
  previews: string[];
  onRemove: (index: number) => void;
  files?: File[];
}

export const MediaPreviewList: React.FC<MediaPreviewListProps> = ({
  previews,
  onRemove,
  files = [],
}) => {
  if (previews.length === 0) return null;

  const renderPreview = (preview: string, index: number) => {
    const file = files[index];

    const fileType = file?.type || "";

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={preview}
          alt={`Preview-${index}`}
          className="w-full h-full object-cover"
        />
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-700">
          <Video size={40} />
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700">
          <FileText size={40} />
        </div>
      );
    }

    if (
      fileType === "application/msword" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700">
          <FileText size={40} />
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
        <FileIcon size={40} />
      </div>
    );
  };

  return (
    <div className="flex flex-row gap-3 flex-wrap mb-3">
      {previews.map((preview, index) => (
        <div
          key={`media-${index}`}
          className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-300 shadow-sm"
        >
          {renderPreview(preview, index)}
          <button
            onClick={() => onRemove(index)}
            className="absolute top-0 right-0 text-sm bg-opacity-50 text-black cursor-pointer rounded-full p-1 hover:bg-opacity-80"
            title="Remove file"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

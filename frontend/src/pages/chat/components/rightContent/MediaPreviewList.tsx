import React, { useEffect, useState } from "react";
import { FileText, File as FileIcon } from "lucide-react";

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
  const [videoThumbnails, setVideoThumbnails] = useState<Record<number, string>>({});

  useEffect(() => {
    files.forEach((file, index) => {
      if (file.type.startsWith("video/") && !videoThumbnails[index]) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.crossOrigin = "anonymous";
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;

        const captureThumbnail = () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL("image/png");
            setVideoThumbnails((prev) => ({
              ...prev,
              [index]: imageUrl,
            }));
          }
        };

        const handleLoadedData = () => {
          // Ensure we seek to the beginning
          video.currentTime = 0;
        };

        const handleSeeked = () => {
          captureThumbnail();
          URL.revokeObjectURL(video.src);
        };

        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("seeked", handleSeeked);

        return () => {
          video.removeEventListener("loadeddata", handleLoadedData);
          video.removeEventListener("seeked", handleSeeked);
        };
      }
    });
  }, [files, videoThumbnails]);

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
      const thumb = videoThumbnails[index];
      if (thumb) {
        return (
          <img
            src={thumb}
            alt={`Video-thumbnail-${index}`}
            className="w-full h-full object-cover"
          />
        );
      }

      // fallback while loading
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
          Loading...
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
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
    <div className="flex flex-row gap-3 flex-wrap">
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

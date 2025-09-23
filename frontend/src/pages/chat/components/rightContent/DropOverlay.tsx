import React from "react";
import clsx from "clsx";

interface DropOverlayProps {
  isDragging: boolean;
}

export const DropOverlay: React.FC<DropOverlayProps> = ({ isDragging }) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-200 pointer-events-none",
        isDragging ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="bg-white/90 backdrop-blur-md border-2 border-dashed border-gray-300 rounded-lg w-full h-full flex flex-col items-center justify-center pointer-events-none px-4">
        <p className="text-gray-700 text-base font-medium">
          Drop your files to upload
        </p>
        <p className="text-gray-400 text-sm mt-1">PNG, JPG, PDF or MP4 up to 25MB</p>
      </div>
    </div>
  );
};

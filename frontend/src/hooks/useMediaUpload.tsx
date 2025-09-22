import { useState } from "react";

export const useMediaUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const fileAndPreviewSetter = (filesArr: File[]) => {
        const objUrls = filesArr.map(elem => URL.createObjectURL(elem))
        setFiles(prev => ([...prev, ...filesArr]));
        setPreviews(prev => ([...prev, ...objUrls]))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const filesArr = Array.from(selectedFiles);
        if (filesArr?.length > 0) {
            fileAndPreviewSetter(filesArr);
        }
    };

    const clear = (index: number) => {
        URL.revokeObjectURL(previews[index])
        const updatedFiles = [...files];
        const updatedPreviews = [...previews];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews)
    };

    return {
        files,
        setFiles,
        previews,
        setPreviews,
        handleChange,
        fileAndPreviewSetter,
        clear
    };
};

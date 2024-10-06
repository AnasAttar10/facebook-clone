import { useRef, useState } from "react";
const useUploadImages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const handlechooseImages = () => {
    if (ref.current) ref.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);

      const generatedPreviews = await generatePreviews(filesArray);
      setPreviews(generatedPreviews);
    }
  };

  const generatePreviews = async (files: File[]) => {
    const promises = files.map((file) => {
      if (file.type.startsWith("image/")) {
        // For images, just return the file URL
        return Promise.resolve(URL.createObjectURL(file));
      } else if (file.type.startsWith("video/")) {
        // For videos, capture the first frame as a screenshot
        return new Promise<string>((resolve) => {
          const videoElement = document.createElement("video");
          videoElement.src = URL.createObjectURL(file);
          videoElement.crossOrigin = "anonymous";
          videoElement.muted = true;

          videoElement.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext("2d");

            videoElement.currentTime = 0;
            videoElement.addEventListener("seeked", () => {
              ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              const screenshotURL = canvas.toDataURL("image/png");
              resolve(screenshotURL); // Resolve with the screenshot image URL
            });
          });
        });
      } else {
        // For unsupported types, return an empty string or handle accordingly
        return Promise.resolve("");
      }
    });

    return Promise.all(promises);
  };
  const removeImage = (idxProps: number) => {
    const newImages = files.filter((_img, idx) => idx !== idxProps);
    setFiles(newImages);
    const newPreviews = previews.filter((_img, idx) => idx !== idxProps);
    setPreviews(newPreviews);
  };

  return {
    ref,
    files,
    previews,
    handlechooseImages,
    handleFileChange,
    removeImage,
  };
};

export default useUploadImages;

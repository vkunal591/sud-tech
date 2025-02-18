import Image from "next/image";
import { useState, useRef } from "react";
// import CircularLoading from "./CircularLoader";
import { IoCloudUpload } from "react-icons/io5";

interface ImageData {
  url: string;
  file: File;
}

interface MultipleImageUploadProps {
  field: {
    value: any;
    name: string;
    label: string;
    required?: boolean;
    multiple?: boolean;
  };
  setFormData: any;
  maxImages?: number; // Maximum number of images to upload
  uploadButtonText?: string; // Custom upload button text
  uploadBoxMessage?: string; // Custom message for upload box
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  field,
  setFormData,
  maxImages = 5,
  // uploadButtonText = "Upload Images",
  uploadBoxMessage = `Click to upload images (max ${maxImages})`,
}) => {
  const fieldname = field.name;
  const upcomingImages =
    field?.value && field?.value.length > 0
      ? field?.value.map((data: any) => ({
          url: data,
          file: null,
        }))
      : [];

  const upcomingFiles =
    field?.value && field?.value.length > 0
      ? field?.value.map((data: any) => ({
          url: data,
        }))
      : [];

  const [selectedImages, setSelectedImages] = useState<ImageData[]>(
    upcomingImages ?? []
  );
  const [selectedFiles, setSelectedFiles] = useState<any[]>(
    upcomingFiles ?? []
  );
  // const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = maxImages - selectedImages.length;
      const newFiles = Array.from(files).slice(0, remainingSlots);
      const newImages = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      const newFilesArray = newFiles.map((file) => file);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
      setSelectedFiles((prevImages) => [...prevImages, ...newFilesArray]);
      const obj: any = fieldname
        ? { [fieldname]: [...selectedFiles, ...newFilesArray] }
        : { imageUrl: newFilesArray };
      const updatedArray = obj.images.map((item: any) =>
        item.url ? item.url : item
      );
      setFormData((prev: any) => ({ ...prev, images: updatedArray }));
    }
  };

  const handleRemoveImage = (url: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.url !== url)
    );
    setSelectedFiles((prevImages) =>
      prevImages.filter((image) => image.url !== url)
    );
    const obj: any = {
      [fieldname]: selectedImages.filter((image: any) => image.url !== url),
    };
    const updatedArray = obj.images.map((item: any) =>
      item.url ? item.url : item
    );
    setFormData((prev: any) => ({ ...prev, [fieldname]: updatedArray }));
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <label htmlFor={field.name} className="block font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        multiple={field?.multiple}
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Upload Box */}
      <>
        {selectedImages && selectedImages.length !== 5 && (
          <div
            onClick={() =>
              selectedImages.length < maxImages && fileInputRef.current?.click()
            }
            className={`flex bg-gray-100 flex-col w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
              selectedImages.length < maxImages
                ? "border-gray-400 hover:border-gray-500"
                : "border-red-500 cursor-not-allowed"
            }`}
          >
            <div className="flex flex-col justify-center items-center h-full text-gray-500">
              <h2 className="text-black-400 font-bold">
                Files Types We Accept
              </h2>
              <p className="text-gray-600 text-sm py-2">
                JPG, JPEG, PNG (Max file size: 1MB)
              </p>
              <span>
                <IoCloudUpload size={50} className="text-gray-500" />
              </span>
              <span className="text-gray-500">
                {selectedImages.length < maxImages
                  ? uploadBoxMessage
                  : `Image limit reached (${maxImages} max)`}
              </span>
            </div>
          </div>
        )}
      </>

      {/* Image Previews */}
      <div className="grid grid-cols-5 gap-5">
        {selectedImages.map((image) => (
          <div key={image.url} className="relative h-36">
            <Image
              width={100}
              height={100}
              src={image.url}
              alt="Selected"
              className="w-full h-full object-contain rounded-lg border border-primary"
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering file input
                handleRemoveImage(image.url);
              }}
              className="absolute -top-3 -right-3 bg-primary text-white w-7 h-7 flex justify-center items-center aspect-square rounded-full p-1 hover:bg-primary/90 transition-all duration-200 ease-linear"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      {/* <div className="flex justify-end items-end w-full">
        {selectedImages.length > 0 && (
          <button
            onClick={handleUpload}
            className={`px-6 py-2 text-white rounded-lg transition-all duration-300 ${
              uploading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={uploading}
          >
            {uploading ? (
              <span className="flex items-center space-x-2">
                <CircularLoading />
                <span>Uploading...</span>
              </span>
            ) : (
              uploadButtonText
            )}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default MultipleImageUpload;

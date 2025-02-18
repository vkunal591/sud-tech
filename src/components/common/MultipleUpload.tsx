"use client";

import Image from "next/image";
import { IoCloudUpload } from "react-icons/io5";
import CircularLoading from "./CircularLoading";
import { useState, useRef, useEffect } from "react";

interface ImageData {
  url: string;
  file: File;
}

const MultipleImageUpload: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Ensures that URL.createObjectURL only runs in the browser environment
    if (typeof window === "undefined") {
      return;
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === "undefined") return;

    const files = event.target.files;
    if (files) {
      // Calculate remaining slots
      const remainingSlots = 5 - selectedImages.length;
      const newFiles = Array.from(files).slice(0, remainingSlots); // Only add files that fit within the limit
      const newImages = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (url: string) => {
    if (typeof window === "undefined") return;

    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.url !== url)
    );
  };

  const handleUpload = () => {
    if (selectedImages.length === 0 || typeof window === "undefined") return;

    setUploading(true);

    // Simulate an upload process
    setTimeout(() => {
      alert("Images uploaded successfully!");
      setUploading(false);
      setSelectedImages([]); // Clear images after upload
    }, 2000);
  };

  if (typeof window === "undefined") {
    return null; // Ensure component only renders on the client
  }

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Upload Box */}
      <div
        onClick={() =>
          selectedImages.length < 5 && fileInputRef.current?.click()
        }
        className={`flex flex-col w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
          selectedImages.length < 5
            ? "border-primary/50 hover:border-primary"
            : "border-red-500 cursor-not-allowed hidden"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full text-gray-500">
          <span>
            <IoCloudUpload size={50} className="text-primary" />
          </span>
          <span className="text-primary">
            {selectedImages.length < 5
              ? "Click to upload images (max 5)"
              : "Image limit reached (5 max)"}
          </span>
        </div>
      </div>

      {/* Image Previews */}
      <div className="grid grid-cols-5 gap-5">
        {selectedImages.map((image) => (
          <div key={image.url} className="relative h-36">
            <Image
              src={image.url}
              alt="Selected"
              width={200}
              height={100}
              priority
              className="w-full h-full object-contain rounded-lg border border-primary"
            />
            {/* Cross Button to Remove Image */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering file input
                handleRemoveImage(image.url);
              }}
              className="absolute -top-3 -right-3 bg-primary text-white w-7 h-7 hover:w-8 hover:h-8 hover:-top-4 hover:-right-4 flex justify-center items-center aspect-square rounded-full p-1 hover:bg-primary/90 transition-all duration-200 ease-linear"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="flex justify-end items-end w-full">
        {selectedImages.length > 0 && (
          <button
            onClick={handleUpload}
            className={`px-6 py-2 text-white  rounded-lg transition-all duration-300 ${
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
              "Upload Images"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleImageUpload;

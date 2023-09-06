import Image from "next/image";
import React, { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";

type ImageUploadProps = {
  selectedImage?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedImage: (value: string) => void;
  setUploaded?: (value: boolean) => void;
  required?: boolean;
  text: "add" | "update";
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  onSelectImage,
  setSelectedImage,
  setUploaded,
  required,
  text,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex items-center mt-2 justify-between">
        <span>cover image {required ? "" : "(optional) :"}</span>
        {selectedImage ? (
          <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <Image
              width={100}
              height={200}
              src={selectedImage}
              alt="cover"
              className="border-spacing-1 border-gray-400 rounded-md  top-0"
            />

            {isHover && (
              <TiDelete
                className="absolute top-0 right-0 z-10 hover:bg-slate-300"
                onClick={() => {
                  {
                    setUploaded && setUploaded(true);
                  }
                  setSelectedImage("");
                }}
              />
            )}
          </div>
        ) : (
          <>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                selectedFileRef.current?.click();
              }}
            >
              {text} cover
            </button>
            <input
              required={required}
              type="file"
              ref={selectedFileRef}
              hidden
              onChange={(e) => {
                {
                  setUploaded && setUploaded(true);
                }
                onSelectImage(e);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default ImageUpload;

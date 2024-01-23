import { X } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  toggle: boolean;
  onClose: () => void;
};

const ProductModal = ({ toggle, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the modal content
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        onClose();
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, toggle]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {toggle ? (
        <div
          ref={modalRef}
          className="w-[90%] h-[90%] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl p-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Nouveau Produit</h2>
            <X onClick={onClose} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex  flex-col w-full">
              <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Choose File
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <span className="flex justify-center">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Selected File"
                      className="ml-2 h-1/2 w-1/2 object-cover "
                    />
                  )}
                </span>
              )}
            </div>
            <div className="bg-red-100"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductModal;

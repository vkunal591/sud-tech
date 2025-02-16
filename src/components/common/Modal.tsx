"use client";

import ReactDOM from "react-dom";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  width?: string;
  formtype?: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  width = "w-4/5",
  formtype,
  isVisible,
  onClose,
  children,
}) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-white backdrop-blur-lg bg-opacity-10"></div>
      <div
        className={`bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl z-10 relative ${width}`}
      >
        <div className="bg-white overflow-scroll no-scrollbar max-h-[90vh] rounded-xl">
          <p className="w-full flex justify-between items-center p-4 pb-0">
            <span className="text-2xl text-primary uppercase font-bold">
              {formtype}
            </span>
            <RxCross1
              size={24}
              className="cursor-pointer text-primary"
              onClick={onClose}
            />
          </p>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;

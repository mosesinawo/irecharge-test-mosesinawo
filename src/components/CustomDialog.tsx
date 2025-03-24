import { useEffect, useRef } from "react";

interface CustomDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  actions?: React.ReactNode;
  disableBackdropClick?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title,
  message,
  onClose,
  actions,
  disableBackdropClick = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClick && dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000096] bg-opacity-50 z-50" onMouseDown={handleBackdropClick}>
     
      <div ref={dialogRef} className="bg-white p-6 rounded-lg shadow-lg w-96 relative sm:mx-0 mx-5">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}

        {/* Message */}
        {message && <p className="text-gray-600 mb-4">{message}</p>}

        {/* Actions */}
        <div className="flex justify-end space-x-2">{actions}</div>
      </div>
    </div>
  );
};

export default CustomDialog;

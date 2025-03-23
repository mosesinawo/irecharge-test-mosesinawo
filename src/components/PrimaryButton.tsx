import React, { FC } from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

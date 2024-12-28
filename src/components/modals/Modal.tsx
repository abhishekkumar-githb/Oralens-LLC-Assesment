import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="relative z-50 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
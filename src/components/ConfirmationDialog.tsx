import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'danger';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = 'warning'
}) => {
  if (!isOpen) return null;
  
  const buttonClass = variant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700' 
    : 'bg-amber-600 hover:bg-amber-700';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-4 shadow-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          {title}
        </h3>
        <p className="text-gray-200 mb-6">
          {message}
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-200 hover:text-gray-100 border border-gray-700 rounded-md hover:bg-gray-800"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-md transition-colors ${buttonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

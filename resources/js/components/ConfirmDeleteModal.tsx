import React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-red-600">Confirm Delete</h2>
        <p className="mt-2 text-gray-700">Are you sure you want to delete this student?</p>
        <div className="mt-4 flex justify-end gap-3">
          <Button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            No
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

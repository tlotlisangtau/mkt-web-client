import React from 'react';
import "../styles/Modal2.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          className="close-btn"
          onClick={() =>
            (window.location.href = `/api/auth/login?redirect=${encodeURIComponent(
              window.location.href
            )}`)
          }
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Modal;

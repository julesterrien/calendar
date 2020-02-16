import React, { useRef, useEffect } from 'react';

import './modal.css';

export const Modal = ({ children, onClose, onEnter }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (onClose && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClose()
    }
  }

  const handleKeyPress = (event) => {
    if (onEnter && event.key === "Enter") {
      onEnter()
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return (
    <div className="modal">
      <div className="modalContent" ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

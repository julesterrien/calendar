import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './modal.css';
import { closeNewEventModal } from './actions';

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch(closeNewEventModal());
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

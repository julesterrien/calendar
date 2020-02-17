import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'novux';

import { MAIN_REDUCER } from '../modules/reducers';

const EventDeleter = () => {
  const dispatch = useDispatch();
  const backspaceClicked = useSelector(
    state => state[MAIN_REDUCER].backspaceClicked
  );

  const handleBackSpace = event => {
    if (event.key === 'Backspace' && !backspaceClicked) {
      dispatch(
        update(MAIN_REDUCER, 'Click backspace', {
          backspaceClicked: true
        })
      );
    } else if (backspaceClicked) {
      dispatch(
        update(MAIN_REDUCER, 'Disable backspace', {
          backspaceClicked: false
        })
      );
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleBackSpace);
    return () => {
      document.removeEventListener('keydown', handleBackSpace);
    };
  });

  return null;
};

export default EventDeleter;

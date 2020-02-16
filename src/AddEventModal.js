import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventModal from './EventModal';
import { submitNewEvent } from './thunks';
import { closeNewEventModal } from './actions';
import { FORM_REDUCER } from './modules/reducers';

const AddEventModal = ownProps => {
  const dispatch = useDispatch();

  const { year, month, day } = ownProps;

  const title = useSelector(state => state[FORM_REDUCER].title);
  const location = useSelector(state => state[FORM_REDUCER].location);

  const submitAndClose = () => {
    dispatch(submitNewEvent({ year, month, day }));
    dispatch(closeNewEventModal());
  }

  return (
    <EventModal
      {...ownProps}
      onClose={submitAndClose}
      onEnter={submitAndClose}
      title={title}
      location={location}
    />
  );
};

export default AddEventModal;

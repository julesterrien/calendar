import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset } from 'novux';

import Modal from './Modal';
import { submitNewEvent } from './thunks';
import { FORM_REDUCER } from './modules/reducers';

import './AddEventModal.css';

const AddEventModal = () => {
  const titleValue = useSelector(state => state[FORM_REDUCER].title);
  const locationValue = useSelector(state => state[FORM_REDUCER].location);
  const dispatch = useDispatch();

  const onChangeTitle = e => {
    dispatch(
      update(FORM_REDUCER, e.target.value, {
        title: e.target.value
      })
    );
  };

  const onChangeLocation = e => {
    dispatch(
      update(FORM_REDUCER, e.target.value, {
        location: e.target.value
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(submitNewEvent());
      dispatch(
        reset(FORM_REDUCER, 'clear form', {
          reset: []
        })
      );
    };
  }, [dispatch]);

  // TODO: add validation for having min title
  return (
    <Modal>
      <div className="addEvent">
        <input
          autoFocus
          type="text"
          placeholder="New Event"
          className="title"
          value={titleValue || ''}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="Add Location"
          className="location"
          value={locationValue || ''}
          onChange={onChangeLocation}
        />
      </div>
    </Modal>
  );
};

export default AddEventModal;

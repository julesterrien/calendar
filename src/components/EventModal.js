import React from 'react';
import { useDispatch } from 'react-redux';
import { reset, update } from 'novux';

import Modal from './Modal';
import { FORM_REDUCER } from '../modules/reducers';

import './EventModal.css';

const INPUTS = {
  title: 'title',
  location: 'location',
  year: 'year',
  month: 'month',
  day: 'day',
};

const EventModal = ({
  title,
  location,
  year,
  month,
  day,
  onClose,
  onEnter
}) => {
  const dispatch = useDispatch();

  const onChange = ({ key, e }) => {
    dispatch(
      update(FORM_REDUCER, e.target.value, {
        [key]: e.target.value
      })
    );
  };

  const onCloseEventModal = () => {
    onClose && onClose();
    dispatch(reset(FORM_REDUCER, 'reset form', { reset: [] }));
  };

  return (
    <Modal onClose={onCloseEventModal} onEnter={onEnter}>
      <div className="addEvent">
        <input
          autoFocus
          type="text"
          placeholder="New Event"
          className="titleInput"
          value={title || ''}
          onChange={(e) => onChange({ e, key: INPUTS.title })}
        />
        <input
          type="text"
          placeholder="Add Location"
          className="locationInput"
          value={location || ''}
          onChange={(e) => onChange({ e, key: INPUTS.location })}
        />

        <div className="dateInputs">
          <input
            type="text"
            className="monthInput"
            value={month}
            disabled
          />
          <input
            type="text"
            className="dayInput"
            value={day}
            disabled
          />
          <input
            type="text"
            className="yearInput"
            value={year}
            disabled
          />
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;

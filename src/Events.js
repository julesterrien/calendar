import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import classnames from 'classnames';

import EventModal from './EventModal';

import './Events.css';
import { openEventModal } from './actions';
import { FORM_REDUCER, MODALS_REDUCER, MAIN_REDUCER } from './modules/reducers';
import { editEvent, deleteEvent } from './thunks';

const Event = event => {
  const selectedEvent = useSelector(
    state => state[MODALS_REDUCER].selectedEvent
  );
  const backspaceClicked = useSelector(
    state => state[MAIN_REDUCER].backspaceClicked
  );

  const modalIsOpen = !!selectedEvent;

  const [numClicks, setNumClicks] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const dispatch = useDispatch();

  const formValues = useSelector(state => state[FORM_REDUCER]);

  const eventModalData = {
    ...event,
    ...formValues
  };

  const onBlurEvent = () => {
    if (!modalIsOpen) {
      setNumClicks(0);
      setIsHighlighted(false);
    }
  };

  const onClickEvent = e => {
    // the parent el (Day) also uses an onClick handler to open AddEventModal
    e.stopPropagation();

    if (!modalIsOpen) {
      setNumClicks(numClicks + 1);
    }
  };

  const onClose = () => {
    dispatch(editEvent(event));
  };

  useEffect(() => {
    if (numClicks === 1) {
      setIsHighlighted(true);
    }

    if (numClicks === 2) {
      dispatch(openEventModal(event));
    }
  }, [numClicks, dispatch, event]);

  useEffect(() => {
    setIsHighlighted(false);
    setNumClicks(0);
  }, [selectedEvent]);

  useEffect(() => {
    if (backspaceClicked && numClicks === 1) {
      dispatch(deleteEvent(event));
    }
  }, [backspaceClicked, dispatch, event, numClicks]);

  return (
    <div
      className={classnames('event', { isHighlighted })}
      onBlur={onBlurEvent}
      onClick={onClickEvent}
    >
      {selectedEvent && selectedEvent.eventId === event.eventId && (
        <EventModal {...eventModalData} onClose={onClose} onEnter={onClose} />
      )}
      {event.title}
    </div>
  );
};

const Events = ({ events }) => {
  return (
    <div className="events">
      {events.map(event => {
        return <Event key={shortid.generate()} {...event} />;
      })}
    </div>
  );
};

export default Events;

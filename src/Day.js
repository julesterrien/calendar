import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { MAIN_REDUCER } from './modules/reducers';
import { openNewEventModal } from './actions';

import AddEventModal from './AddEventModal';

import './Day.css';

const Day = ({ isCurrent, day, index }) => {
  const [numClicks, setNumClicks] = useState(0);
  const onBlur = () => setNumClicks(0);
  const onClick = () => setNumClicks(numClicks + 1);

  const newEventIndex = useSelector((state) => state[MAIN_REDUCER].newEventIndex);

  const dispatch = useDispatch();
  useEffect(() => {
    if (numClicks === 2) {
      dispatch(openNewEventModal({ index }));
    }
  }, [numClicks, dispatch, index]);

  return (
    <article className={classnames('day', { isCurrent })}>
      {newEventIndex === index && (
        <AddEventModal />
      )}
      <button className="cellButton" onBlur={onBlur} onClick={onClick}>
        <header className={classnames({ isCurrent })}>
          <span className="dayDate">{day}</span>
        </header>
        <div className="events">
          <div className="event">Event 1</div>
          <div>Event 2</div>
        </div>
      </button>
    </article>
  );
};

export default Day;

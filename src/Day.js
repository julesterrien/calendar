import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { MAIN_REDUCER, EVENTS_REDUCER } from './modules/reducers';
import { openNewEventModal } from './actions';

import AddEventModal from './AddEventModal';

import './Day.css';

const Day = ({ isCurrentPeriod, isToday, year, month, day, index }) => {
  const [numClicks, setNumClicks] = useState(0);
  const onBlur = () => setNumClicks(0);
  const onClick = () => setNumClicks(numClicks + 1);

  const newEventIndex = useSelector(state => state[MAIN_REDUCER].newEventIndex);

  const dispatch = useDispatch();
  useEffect(() => {
    if (numClicks === 2) {
      dispatch(openNewEventModal({ index }));
    }
  }, [numClicks, dispatch, index]);

  const events = useSelector(state => state[EVENTS_REDUCER]) || {};
  const eventsAtDay = events[`${year} ${month} ${day}`] || [];

  return (
    <article className={classnames('day', { isCurrentPeriod })}>
      {newEventIndex === index && (
        <AddEventModal year={year} month={month} day={day} />
      )}
      <button className="cellButton" onBlur={onBlur} onClick={onClick}>
        <header className={classnames({ isCurrentPeriod })}>
          <span className={classnames('dayDate', { isToday })}>{day}</span>
        </header>
        <div className="events">
          {eventsAtDay.map(event => (
            <div key={event.eventId} className="event">
              {event.title}
            </div>
          ))}
        </div>
      </button>
    </article>
  );
};

export default Day;

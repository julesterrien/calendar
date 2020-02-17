import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { EVENTS_REDUCER, MODALS_REDUCER } from '../modules/reducers';
import { openNewEventModal } from '../actions';

import AddEventModal from './AddEventModal';

import './Day.css';
import Events from './Events';
import { getEventDate } from '../utils';

const Day = ({ isCurrentPeriod, isToday, year, month, day, index }) => {
  const [numClicks, setNumClicks] = useState(0);

  const onBlur = () => setNumClicks(0);
  const onClick = () => setNumClicks(numClicks + 1);

  const newEventModalIndex = useSelector(
    state => state[MODALS_REDUCER].newEventModalIndex
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (numClicks === 2) {
      dispatch(openNewEventModal({ index }));
    }
  }, [numClicks, dispatch, index]);

  const events = useSelector(state => state[EVENTS_REDUCER]) || {};
  const eventsAtDay = events[getEventDate({ year, month, day })] || [];

  return (
    <article className={classnames('day', { isCurrentPeriod })}>
      {newEventModalIndex === index && (
        <AddEventModal year={year} month={month} day={day} />
      )}
      <button className="cellButton" onBlur={onBlur} onClick={onClick}>
        <header className={classnames({ isCurrentPeriod })}>
          <span className={classnames('dayDate', { isToday })}>{day}</span>
        </header>
        <Events events={eventsAtDay} />
      </button>
    </article>
  );
};

export default Day;

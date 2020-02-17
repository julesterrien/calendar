import React, { useEffect } from 'react';
import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { MAIN_REDUCER } from '../modules/reducers';
import { loadEvents } from '../thunks';

import Day from './Day';

import './MonthView.css';

const dayNames = moment.weekdaysShort();

const MonthView = () => {
  const dispatch = useDispatch();
  const month = useSelector(state => state[MAIN_REDUCER].currentMonth);
  const year = useSelector(state => state[MAIN_REDUCER].currentYear);
  const monthViewDays = useSelector(state => state[MAIN_REDUCER].monthViewDays);

  useEffect(() => {
    if (month && year) {
      // reload events each time the user changes month
      // an optimization here could be to NOT reload events if they already exist in state by checking if:
      // Object.keys(EVENTS_REDUCER).some((key) => key.startsWith(`${year} ${month}`))
      dispatch(loadEvents({
        month,
        year
      }));
    }
  }, [dispatch, month, year])

  return (
    <div className="view">
      <div className="dayNames">
        {dayNames.map(name => (
          <div key={name} className="dayName">
            <h6 className="dayNameTitle">
              {name}
            </h6>
          </div>
        ))}
      </div>
      <main className="dayCells">
        {monthViewDays && monthViewDays.map((day, index) => (
          <Day key={shortid.generate()} index={index} {...day} />
        ))}
      </main>
    </div>
  );
};

export default MonthView;

import React from 'react';
import shortid from 'shortid';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { MAIN_REDUCER } from './modules/reducers';

import Day from './Day';

import './MonthView.css';
import { getMonthViewDayProps } from './utils';

const MonthView = () => {
  const dayNames = moment.weekdaysShort();

  const month = useSelector(state => state[MAIN_REDUCER].currentMonth);
  const year = useSelector(state => state[MAIN_REDUCER].currentYear);
  const monthViewDays = getMonthViewDayProps({ month, year });

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
        {monthViewDays.map(day => (
          <Day key={shortid.generate()} {...day} />
        ))}
      </main>
    </div>
  );
};

export default MonthView;

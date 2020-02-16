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

  const currentMonth = `${year} ${month}`;
  const monthViewDays = getMonthViewDayProps({ currentMonth });

  return (
    <div className="view">
      {dayNames.map(name => (
        <div key={name}>{name}</div>
      ))}
      {monthViewDays.map(day => (
        <Day key={shortid.generate()} {...day} />
      ))}
    </div>
  );
};

export default MonthView;

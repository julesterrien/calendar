import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MAIN_REDUCER } from './modules/reducers';
import {
  viewPreviousMonth,
  viewNextMonth,
  viewCurrentMonth,
} from './actions';

import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const currentMonth = useSelector(state => state[MAIN_REDUCER].currentMonth);
  const currentYear = useSelector(state => state[MAIN_REDUCER].currentYear);

  const onPreviousClick = () => {
    dispatch(viewPreviousMonth());
  };

  const onNextClick = () => {
    dispatch(viewNextMonth());
  };

  const onTodayClick = () => {
    dispatch(viewCurrentMonth());
  };

  return (
    <header className="header">
      <div className="currentPeriod">
        <h4 className="month">{currentMonth}</h4>
        <h3>{currentYear}</h3>
      </div>

      <nav className="nav">
        <button onClick={onPreviousClick}>‹</button>
        <button onClick={onTodayClick}>Today</button>
        <button onClick={onNextClick}>›</button>
      </nav>
    </header>
  );
};

export default Header;

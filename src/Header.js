import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MAIN_REDUCER } from './modules/reducers';
import { viewPreviousMonth, viewNextMonth } from './actions';

const Header = () => {
  const dispatch = useDispatch();
  const currentMonth = useSelector(state => state[MAIN_REDUCER].currentMonth);
  const currentYear = useSelector(state => state[MAIN_REDUCER].currentYear);

  const seePreviousMonth = () => {
    dispatch(viewPreviousMonth());
  };

  const seeNextMonth = () => {
    dispatch(viewNextMonth());
  };

  return (
    <header className="header">
      <div className="currentPeriod">
        {currentMonth} {currentYear}
      </div>

      <nav className="nav">
        <button onClick={seePreviousMonth}>{'<-'}</button>
        <button onClick={seeNextMonth}>{'->'}</button>
      </nav>
    </header>
  );
};

export default Header;

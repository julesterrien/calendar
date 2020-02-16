import React from 'react';
import classnames from 'classnames';

import './Day.css';

const Day = ({ current }) => {
  return <div className={classnames('day', { current })}>x</div>;
};

export default Day;

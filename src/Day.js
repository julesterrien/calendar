import React from 'react';
import classnames from 'classnames';

import './Day.css';

const Day = ({ current, day }) => {
  return (
    <article className={classnames('day', { current })}>
      <header className={classnames({ current })}>{day}</header>
      <div className="events">

      </div>
    </article>
  );
};

export default Day;

import React from 'react';
import Header from './Header';
import MonthView from './MonthView';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="calendar">
        <Header />
        <MonthView />
      </div>
    </div>
  );
};

export default App;

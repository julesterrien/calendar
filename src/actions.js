import { update, reset } from 'novux';
import moment from 'moment';

import { MAIN_REDUCER } from './modules/reducers';

const now = moment();

export const viewPreviousMonth = () => {
  const previousMonth = now.subtract(1, 'month');

  return update(MAIN_REDUCER, 'View previous month', {
    currentMonth: previousMonth.format('MMMM'),
    currentYear: previousMonth.year()
  });
};

export const viewNextMonth = () => {
  const nextMonth = now.add(1, 'month');

  return update(MAIN_REDUCER, 'View next month', {
    currentMonth: nextMonth.format('MMMM'),
    currentYear: nextMonth.year()
  });
};

export const viewCurrentMonth = () => {
  const currentMonth = moment();

  return update(MAIN_REDUCER, 'View current month', {
    currentMonth: currentMonth.format('MMMM'),
    currentYear: currentMonth.year()
  });
};

export const openNewEventModal = ({ index }) => {
  return update(MAIN_REDUCER, 'Open event modal', {
    newEventIndex: index,
  });
};

export const closeNewEventModal = () => {
  return reset(MAIN_REDUCER, 'Close event modal', {
    reset: ['newEventIndex'],
  });
};

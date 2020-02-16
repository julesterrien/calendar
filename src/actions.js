import { update } from 'novux';
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

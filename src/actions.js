import { update } from 'novux';
import moment from 'moment';

import { MAIN_REDUCER, MODALS_REDUCER } from './modules/reducers';

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
  return update(MODALS_REDUCER, 'Open new event modal', {
    newEventModalIndex: index,
  });
};

export const closeNewEventModal = () => {
  return update(MODALS_REDUCER, 'Close new event modal', {
    newEventModalIndex: undefined,
  });
};

export const openEventModal = (event) => {
  return update(MODALS_REDUCER, 'Open event modal', {
    selectedEvent: event,
  });
};

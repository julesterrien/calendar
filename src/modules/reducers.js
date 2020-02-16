import { createReducer } from 'novux';
import moment from 'moment';

export const MAIN_REDUCER = 'main';
export const FORM_REDUCER = 'form';
export const EVENTS_REDUCER = 'events';

const now = moment();

const mainReducer = createReducer(MAIN_REDUCER, {
  currentMonth: now.format('MMMM'),
  currentYear: now.format('YYYY'),
});

const formReducer = createReducer(FORM_REDUCER, {});

const eventsReducer = createReducer(EVENTS_REDUCER, {});

const reducers = {
  main: mainReducer,
  form: formReducer,
  events: eventsReducer,
};

export default reducers;

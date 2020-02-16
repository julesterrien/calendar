/*
  novux is a reducer factory pattern I wrote/open sourced
  https://www.npmjs.com/package/novux
*/
import { createReducer } from 'novux';
import moment from 'moment';

export const MAIN_REDUCER = 'main';
export const FORM_REDUCER = 'form';
export const EVENTS_REDUCER = 'events';
export const MODALS_REDUCER = 'modals';

const now = moment();

const mainReducer = createReducer(MAIN_REDUCER, {
  currentMonth: now.format('MMMM'),
  currentYear: now.format('YYYY'),
});

const formReducer = createReducer(FORM_REDUCER, {});

const eventsReducer = createReducer(EVENTS_REDUCER, {});

const modalsReducer = createReducer(MODALS_REDUCER, {});

const reducers = {
  [MAIN_REDUCER]: mainReducer,
  [FORM_REDUCER]: formReducer,
  [EVENTS_REDUCER]: eventsReducer,
  [MODALS_REDUCER]: modalsReducer,
};

export default reducers;

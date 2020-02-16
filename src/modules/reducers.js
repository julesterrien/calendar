import { createReducer } from 'novux';
import moment from 'moment';

export const MAIN_REDUCER = 'main';

const now = moment();

const mainReducer = createReducer(MAIN_REDUCER, {
  currentMonth: now.format('MMMM'),
  currentYear: now.format('YYYY'),
});

const reducers = {
  main: mainReducer,
};

export default reducers;

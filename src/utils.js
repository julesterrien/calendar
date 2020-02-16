import moment from 'moment';

const TOTAL_DAYS_IN_MONTH_VIEW = 7 * 6; // grid view

const DAY_IN_CURRENT_MONTH = { current: true };
const DAY_IN_OTHER_MONTH = { current: false };

/**
 * getMonthViewDayProps
 * @param {String} currentMonth eg. '2020 Febuary'
 * @returns {Array} previous + current + next month days to be displayed on the month view grid
 */
export const getMonthViewDayProps = ({ currentMonth }) => {
  const numDaysBeforeStartOfMonth = parseInt(
    moment(currentMonth)
      .startOf('month')
      .format('d'),
    10
  );
  const numDaysInCurrentMonth = moment(currentMonth).daysInMonth();

  let monthViewDays = [
    // Array.fill requires a polyfill for IE (not included in this MVP)
    ...Array(numDaysBeforeStartOfMonth).fill(DAY_IN_OTHER_MONTH),
    ...Array(numDaysInCurrentMonth).fill(DAY_IN_CURRENT_MONTH)
  ];

  const numDaysAfterEndOfMonth =
    TOTAL_DAYS_IN_MONTH_VIEW - monthViewDays.length;
  if (numDaysAfterEndOfMonth) {
    monthViewDays = monthViewDays.concat(
      Array(numDaysAfterEndOfMonth).fill(DAY_IN_OTHER_MONTH)
    );
  }

  return monthViewDays;
};

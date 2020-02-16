import moment from 'moment';

const TOTAL_DAYS_IN_MONTH_VIEW = 7 * 6; // grid view

const DAY_IN_CURRENT_MONTH = { isCurrent: true };
const DAY_IN_OTHER_MONTH = { isCurrent: false };

const now = moment();

/**
 * getMonthViewDayProps
 * returns an array with all days to be shown on current month grid
 * uses Array.fill which requires a polyfill for IE but not included in this MVP
 * @param {String} currentPeriod eg. '2020 Febuary'
 * @returns {Array} [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
 */
export const getMonthViewDayProps = ({ month, year }) => {
  const currentPeriod = `${year} ${month}`;
  const previousMonth = moment(currentPeriod).subtract(1, 'month');

  const numDaysInPreviousMonth = moment(previousMonth).daysInMonth();
  const numDaysBeforeStartOfMonth = parseInt(
    moment(currentPeriod)
      .startOf('month')
      .format('d'),
    10
  );
  const numDaysInCurrentMonth = moment(currentPeriod).daysInMonth();

  let monthViewDays = [
    ...Array(numDaysBeforeStartOfMonth)
      .fill(DAY_IN_OTHER_MONTH)
      .map((el, index) => ({
        ...el,
        day: numDaysInPreviousMonth - numDaysBeforeStartOfMonth + index + 1
      })),

    ...Array(numDaysInCurrentMonth)
      .fill(DAY_IN_CURRENT_MONTH)
      .map((el, index) => ({
        ...el,
        day: index + 1,
        isToday: now.format('MMMM') === month && index + 1 === now.date(),
      }))
  ];

  const numDaysAfterEndOfMonth =
    TOTAL_DAYS_IN_MONTH_VIEW - monthViewDays.length;

  if (numDaysAfterEndOfMonth) {
    monthViewDays = monthViewDays.concat(
      Array(numDaysAfterEndOfMonth)
        .fill(DAY_IN_OTHER_MONTH)
        .map((el, index) => ({ ...el, day: index + 1 }))
    );
  }

  return monthViewDays;
};

import moment from 'moment';

const TOTAL_DAYS_IN_MONTH_VIEW = 7 * 6; // grid view used by client

const DAY_IN_CURRENT_MONTH = { isCurrentPeriod: true };
const DAY_IN_OTHER_MONTH = { isCurrentPeriod: false };

const now = moment();

export const getParsedEvents = ({ events, year, month, day }) =>
  events.map(eventStr => {
    const [parsedId, parsedTitle, parsedLocation] = eventStr.split(':');
    return {
      eventId: parsedId,
      title: parsedTitle,
      location: parsedLocation,
      year,
      month,
      day
    };
  });

export const getEventDate = ({ year, month, day }) => `${year} ${month} ${day}`;

const getDaysPreviousMonth = ({
  numDaysBeforeStartOfMonth,
  numDaysInPreviousMonth,
  previousMonth,
  year
}) =>
  Array(numDaysBeforeStartOfMonth)
    .fill(DAY_IN_OTHER_MONTH)
    .map(({ isCurrentPeriod }, index) => ({
      isCurrentPeriod,
      day: numDaysInPreviousMonth - numDaysBeforeStartOfMonth + index + 1,
      month: previousMonth.format('MMMM'),
      year: previousMonth.format('MMMM') === 'December' ? year - 1 : year
    }));

const getDaysCurrentMonth = ({ numDaysInCurrentMonth, year, month }) =>
  Array(numDaysInCurrentMonth)
    .fill(DAY_IN_CURRENT_MONTH)
    .map(({ isCurrentPeriod, }, index) => ({
      isCurrentPeriod,
      day: index + 1,
        month,
        year,
        isToday:
          now.format('YYYY') === year.toString() &&
          now.format('MMMM') === month &&
          now.date() === index + 1
    }));

const getDaysNextMonth = ({ numDaysAfterEndOfMonth, nextMonth, year }) =>
  Array(numDaysAfterEndOfMonth)
    .fill(DAY_IN_OTHER_MONTH)
    .map(({ isCurrentPeriod,}, index) => ({
      isCurrentPeriod,
      day: index + 1,
      month: nextMonth.format('MMMM'),
      year: nextMonth.format('MMMM') === 'January' ? year + 1 : year
    }));

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
  const nextMonth = moment(currentPeriod).add(1, 'month');

  const numDaysInPreviousMonth = moment(previousMonth).daysInMonth();
  const numDaysBeforeStartOfMonth = parseInt(
    moment(currentPeriod)
      .startOf('month')
      .format('d'),
    10
  );
  const numDaysInCurrentMonth = moment(currentPeriod).daysInMonth();

  const daysPreviousMonth = getDaysPreviousMonth({
    numDaysBeforeStartOfMonth,
    numDaysInPreviousMonth,
    previousMonth,
    year
  });

  const daysCurrentMonth = getDaysCurrentMonth({
    numDaysInCurrentMonth,
    year,
    month
  });

  let monthViewDays = daysPreviousMonth.concat(daysCurrentMonth);

  const numDaysAfterEndOfMonth =
    TOTAL_DAYS_IN_MONTH_VIEW - monthViewDays.length;

  if (numDaysAfterEndOfMonth) {
    const daysNextMonth = getDaysNextMonth({
      numDaysAfterEndOfMonth,
      nextMonth,
      year
    });
    monthViewDays = monthViewDays.concat(daysNextMonth);
  }

  return monthViewDays;
};

import { update, reset } from 'novux';
import shortid from 'shortid';

import { FORM_REDUCER, EVENTS_REDUCER, MAIN_REDUCER, MODALS_REDUCER } from './modules/reducers';

const DEFAULT_TITLE = 'New Event';

export const submitNewEvent = ({ year, month, day }) => (
  dispatch,
  getState
) => {
  const formValues = getState()[FORM_REDUCER];
  const events = getState()[EVENTS_REDUCER] || {};

  const date = `${year} ${month} ${day}`;
  const eventsAtDay = events[date] || [];

  const newEvent = {
    ...formValues,
    year,
    month,
    day,
    title: formValues.title || DEFAULT_TITLE,
    eventId: shortid.generate()
  };

  eventsAtDay.push(newEvent);

  dispatch(
    update(EVENTS_REDUCER, 'add event', {
      [date]: eventsAtDay
    })
  );

  dispatch(
    reset(FORM_REDUCER, 'clear form', {
      reset: []
    })
  );
};

export const editEvent = (event) => (dispatch, getState) => {
  const formValues = getState()[FORM_REDUCER];
  const events = getState()[EVENTS_REDUCER];

  const eventDate = `${event.year} ${event.month} ${event.day}`;
  const eventsForEventDate = events[eventDate] || [];

  const editedEvents = eventsForEventDate.map(({ eventId, ...eventData }) => {
    if (eventId === event.eventId) {
      return {
        ...event,
        ...formValues,
      };
    }
    return eventData;
  });

  dispatch(
    update(EVENTS_REDUCER, 'Update event', {
      [eventDate]: editedEvents,
    })
  );

  dispatch(
    update(MODALS_REDUCER, 'Close event modal', {
      selectedEvent: undefined
    })
  );
};

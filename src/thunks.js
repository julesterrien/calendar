import { update, reset } from 'novux';

import {
  FORM_REDUCER,
  EVENTS_REDUCER,
  MODALS_REDUCER,
  MAIN_REDUCER
} from './modules/reducers';
import { getEventDate } from './utils';

import * as api from './api';

const DEFAULT_TITLE = 'New Event';

export const submitNewEvent = ({ year, month, day }) => async (
  dispatch,
  getState
) => {
  const formValues = getState()[FORM_REDUCER];
  const date = getEventDate({ year, month, day });

  const newEvent = {
    ...formValues,
    year,
    month,
    day,
    title: formValues.title || DEFAULT_TITLE
  };

  const { data, error, status } = await api.postNewEvent(newEvent);

  if (error || status !== 200) {
    // TODO: it would be nice to show a banner notifying the user of an error
    console.log(error);
  } else if (data) {
    dispatch(
      update(EVENTS_REDUCER, 'update eventsAtDay', {
        [date]: data.eventsAtDay
      })
    );
  }

  dispatch(
    reset(FORM_REDUCER, 'clear form', {
      reset: []
    })
  );
};

export const editEvent = event => async (dispatch, getState) => {
  const formValues = getState()[FORM_REDUCER];
  const { year, month, day } = event;

  const eventDate = getEventDate({ year, month, day });

  const { data, error, status } = await api.editEvent({
    ...event,
    ...formValues
  });

  if (error || status !== 200) {
    // TODO: it would be nice to show a banner notifying the user of an error
    console.log(error);
  } else if (data) {
    dispatch(
      update(EVENTS_REDUCER, 'Update eventsAtDay', {
        [eventDate]: data.eventsAtDay
      })
    );
  }

  dispatch(
    update(MODALS_REDUCER, 'Close event modal', {
      selectedEvent: undefined
    })
  );
};

export const deleteEvent = ({ year, month, day, eventId }) => async (
  dispatch,
  getState
) => {
  const eventDate = getEventDate({ year, month, day });

  const { data, error, status } = await api.deleteEvent({
    eventDate,
    eventId
  });

  if (error || status !== 200) {
    // TODO: it would be nice to show a banner notifying the user of an error
    console.log(error);
  } else if (data) {
    dispatch(
      update(EVENTS_REDUCER, 'Update eventsAtDay', {
        [eventDate]: data.eventsAtDay
      })
    );
  }

  dispatch(
    update(MAIN_REDUCER, 'Reset backspace', {
      backspaceClicked: false,
    })
  );
};

export const loadEvents = ({ year, month }) => async (dispatch) => {
  // note: it would be nice to show a loading state while this data is being fetched but it's overkill for this MVP

  const { data, error, status } = await api.loadEvents({ year, month });

  if (error || status !== 200) {
    // TODO: it would be nice to show a banner notifying the user of an error
    console.log(error);
  } else if (data) {
    dispatch(
      update(MAIN_REDUCER, 'Update monthViewDays schema', {
        monthViewDays: data.monthViewDays,
      })
    );
    dispatch(
      update(EVENTS_REDUCER, 'Update eventsAtDay', data.events)
    );
  }
};

import axios from 'axios';

const ERROR = 'Something went wrong. Please try again.';

export const postNewEvent = async (newEvent) => {
  try {
    const response = await axios.post('/api/createEvent', newEvent);
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}

export const editEvent = async (event) => {
  try {
    const response = await axios.put('/api/editEvent', event);
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}

export const deleteEvent = async ({ eventDate, eventId }) => {
  try {
    const response = await axios.delete(`/api/delete/${eventDate}/${eventId}`);
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}

export const loadEvents = async ({ year, month }) => {
  try {
    const response = await axios.get(`/api/events/${year}/${month}`);
    return response;
  } catch (error) {
    return {
      error: ERROR,
    }
  }
}

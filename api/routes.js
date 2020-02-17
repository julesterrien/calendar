import { redis } from './lib';
import shortid from 'shortid';

import { getParsedEvents, getEventDate } from './utils';

export const createEvent = async (req, res) => {
  const { title, location = '', year, month, day } = req.body;

  try {
    const eventDate = getEventDate({ year, month, day });

    const event = `${shortid.generate()}:${title}:${location}`;
    await redis.rpush([eventDate, event]);

    const updatedEventsAtDay = await redis.lrange(eventDate, 0, -1);
    const parsedEvents = getParsedEvents({
      events: updatedEventsAtDay,
      year,
      month,
      day
    });

    return res.send({ eventsAtDay: parsedEvents });
  } catch (e) {
    console.log('e', e);
  }
}

export const editEvent = async (req, res) => {
  const { eventId, title, location = '', year, month, day } = req.body;

  try {
    const eventDate = getEventDate({ year, month, day });
    const eventsAtDay = await redis.lrange(eventDate, 0, -1);

    const promises = [];
    (eventsAtDay || []).map((event, i) => {
      if (event.startsWith(eventId)) {
        const updatedEvent = `${eventId}:${title}:${location}`;
        promises.push(redis.lset(eventDate, i, updatedEvent));
      }
    });

    await Promise.all(promises);

    const updatedEventsAtDay = await redis.lrange(eventDate, 0, -1);

    const parsedEvents = getParsedEvents({
      events: updatedEventsAtDay,
      year,
      month,
      day
    });

    return res.send({ eventsAtDay: parsedEvents });
  } catch (e) {
    console.log('e', e);
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { eventDate, eventId } = req.params;

    const eventsAtDay = await redis.lrange(eventDate, 0, -1);

    const promises = [];
    (eventsAtDay || []).map((event, i) => {
      if (event.startsWith(eventId)) {
        promises.push(redis.lrem(eventDate, 0, event));
      }
    });

    await Promise.all(promises);

    const updatedEventsAtDay = await redis.lrange(eventDate, 0, -1);

    const [year, month, day] = eventDate.split(' ');
    const parsedEvents = getParsedEvents({
      events: updatedEventsAtDay,
      year,
      month,
      day
    });

    return res.send({ eventsAtDay: parsedEvents });
  } catch (e) {
    console.log('e', e);
  }
}

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

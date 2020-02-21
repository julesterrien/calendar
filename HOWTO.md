# Goals

- Build a simple calendar app where users can CRUD events.
- Use custom display logic instead of an open source lib.
- Store data in state or persist it through a backend.
- Focus on functionality over style.
- Auth is not required.

# Exploration

### What is the MVP here?

I exchanged emails with Meredith and learned that:
- it should handle only Gregorian calendar
- it should handle leap years
- time can be handled by an open source lib
- showing other views other than a month view isn't important
- showing time intervals isn't important
- optimizing for mobile isn't important
- a simple CRUD app for the backend is fine
- writing tests isn't important

### What is the best practice here?

I looked at a variety of calendar apps to get inspired:
- [React Calendar](https://www.npmjs.com/package/react-calendar)
- [gCal](https://calendar.google.com/calendar/r)
- [iCal](https://www.icloud.com/calendar)

And decided to use iCal as the main inspiration: it has simple UI and an engaging UX (keyboard events handling).

# User stories

I defined a set of stories to understand the work to be done:
- As a user, I can go to a page to view an app
- As a user, I can view the current year, month and days.
  . Days in the previous or next month can be displayed to fill up the grid
  . Days in the current monday and the day matching today should be highlighted
- As a user, I can navigate through months and easily come back to today
- As a user, I can easily add an event (title, location and date)
- As a user I can edit an existing event
- As a user, I can delete an event
- As a user, I can see events when I first load the page and/or when I reload the page

# Tech

## Stack
- Frontend: React/HTML/CSS (via create-react-app) with redux with thunks (for async) & novux (for actionCreators/reducers)
- HTTP client: axios
- Backend: nodeJS + express server + redis store
- Time: momentJS

## Data/schema/types

#### What is a 'Day'?
```
{
  isCurrentPeriod: Boolean
  isToday: Boolean
  year: String
  month: String
  day: Number
}
```

#### What is an 'Event'?
```
{
  eventId: String
  title: String
  location: String
  year: String
  month: String
  day: Number
}
```

#### What is the DB Schema?

Days map to arrays of events (arrays are lists in redis)
- Key: `year:month:day`
- Value: `Array<`eventId:title:location`>`

#### How can frontend state be organized?

`main` reducer holds general calendar info:
```
{
  // define && keep track of current month
  // changing this should result in a call to update the grid schema
  currentMonth: String

  // define && keep track of current year
  // changing this should result in a call to update the grid schema
  currentYear: String

  // schema to create the grid for the given current period
  monthViewDays: Array<Days>
}
```

`form` reducer holds form state
```
{
  [fieldName]: value
}
```

`events` reducer holds events per day
```
{
  [day]: Array<Event>
}
```

`modals` reducer defines which modals are open and how
```
{
  [modalId]: Boolean | modalData
}
```

## API
- GET /events/:year/:month
Returns the schema for this period + the events for each day
```
{
  monthViewDays: Array<Days>
  events: { [Day]: Array<Event> }
}
```

- POST /createEvent
Returns the events for that day
```
{
  eventsAtDay: Array<Event>
}
```

- PUT /editEvent
Returns the events for that day
```
{
  eventsAtDay: Array<Event>
}
```

- DELETE /delete/:eventDate/:eventId
Returns the events for that day
```
{
  eventsAtDay: Array<Event>
}
```

## UI/UX
#### Grid:

To define rows every 7 cells I used flex && flex-wrap and split the full width of the viewport in 7.

#### Core component:
```
<Calendar />
  <Header />
    <CurrentMonthYear />
    <NavActions />
  <MonthView />
    <DayNames />
    <Days />
      <AddEventModal />
      <Events />
        <EventModal />
```

#### Generic components:
```
<BackspaceHandler />
<Modal />
```

#### User Experience
- Buttons to navigate through time
- Double click to add an event
- Double click on an event to view
- Click on an event and Backspace to delete

#### Edge cases
- Long event titles: display an ellipsis
- Too many events on a day: don't handle on MVP
- Error handling: don't handle on MVP

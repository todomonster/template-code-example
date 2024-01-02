function listEvents(element) {
  const events = getEventListeners(element);
  const eventList = Object.keys(events);
  return eventList;
}

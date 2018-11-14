import cloneEvent from './clone-event';

/**
 * Forward an event by cloning and dispatching it.
 * @param   {object}  event  Event to be forwarded.
 * @param   {object}  target  Target HTML element for the event.
 */
const forwardEvent = (event, target) => {
  const newEvent = cloneEvent(event);
  target.dispatchEvent(newEvent);
};

export default forwardEvent;

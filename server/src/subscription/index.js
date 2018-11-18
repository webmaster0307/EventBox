import { PubSub } from 'apollo-server';

import * as EVENT_EVENTS from './event';

export const EVENTS = {
  EVENT: EVENT_EVENTS,
};

export default new PubSub();

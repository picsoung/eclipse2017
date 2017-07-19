import { searchEvents, getTimezone, getEclipseDetails, searchVisualization, getBackgroundDetails } from '../api';

export const getEvents = ({ commit }, data) => {
  return searchEvents(data, 200000).then((value) => {
    return value;
  });
};

export const displayTimezone = ({ commit }, data) => {
  return getTimezone(data).then((value) => {
    return value;
  });
};

export const displayEclipseDetails = ({ commit }, data) => {
  return getEclipseDetails(data).then((value) => {
    return value;
  });
};

export const displayVisualization = ({ commit }, data) => {
  return searchVisualization(data).then((value) => {
    return value.hits[0]; // we assume first result is the one we are looking for
  });
};

export const getBackground = ({ commit }, data) => {
  return getBackgroundDetails().then((value) => {
    return value;
  });
};

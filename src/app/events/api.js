import algoliasearch from 'algoliasearch';
import axios from 'axios';

// Search event around specific coordinates and radius (in m)
export const searchEvents = (coordinates, radius) => {
  let client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
  let events = client.initIndex('official_events');

  return events.search({
    query: '',
    aroundLatLng: coordinates.lat + ', ' + coordinates.lng,
    aroundRadius: radius || 200000,
    getRankingInfo: true
  }).then(res => {
    return res;
  });
};

export const getTimezone = (coordinates) => {
  let API_URL = 'https://api.timezonedb.com/v2/get-time-zone?';
  API_URL += 'key=' + process.env.TMZDB_KEY;
  API_URL += '&format=json&by=position';
  API_URL += '&lat=' + coordinates.lat + '&lng=' + coordinates.lng;

  return axios.get(API_URL).then(function (result) {
    return result.data;
  }).catch(function (err) {
    console.log('TimezoneDB API Error', err);
  });
};

export const getEclipseDetails = (coords) => {
  let API_URL = 'https://8bc1hhrra2.execute-api.us-east-1.amazonaws.com/dev/usno?'; // using AWS API GATEWAY for HTTPS proxy to http://api.usno.navy.mil/eclipses/solar
  API_URL += 'date=08/21/2017&height=200&format=json';
  API_URL += '&coords=' + coords.lat + ',' + coords.lng;

  return axios.get(API_URL).then(function (result) {
    return result.data;
  }).catch(function (err) {
    console.log('Eclipse API Error', err);
    return {};
  });
};

// Search in visualization index
export const searchVisualization = (coordinates) => {
  let client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
  let cities = client.initIndex('eclipse_visualization');

  return cities.search({
    query: '',
    aroundLatLng: coordinates.lat + ', ' + coordinates.lng,
    getRankingInfo: true
  }).then(res => {
    return res;
  });
};

export const getBackgroundDetails = () => {
  let API_URL = 'https://api.nasa.gov/planetary/apod?';
  API_URL += 'api_key=' + process.env.NASA_API_KEY;
  API_URL += '&count=1&hd=true';

  return axios.get(API_URL).then(function (result) {
    return result.data[0];
  }).catch(function (err) {
    console.log('NASA API Error', err);
  });
};

angular.module('LdnBeerApp')
  .controller('Calendar', function(Calendar) {
    var calEvent = {
      start: new Date(2015,7, 15, 13, 30, 0),
      title: 'this is a demo',
      duration: 60,
      recurring: {
        freq: 'WEEKLY',
        interval: 1
      }
    };
    console.log('ical', Calendar.ical([calEvent]));
    console.log('outlook', Calendar.outlook(calEvent));
    console.log('google', Calendar.google(calEvent));
    console.log('yahoo', Calendar.yahoo(calEvent));
  });
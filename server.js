'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// this allows us to call express functions via app.get etc.
const app = express();
app.use(cors());

// making this 3001 means you can see if it's getting env variables OR just defaulting
const PORT = process.env.PORT || 3001;



// ======= Routes ==========

app.get('/location', getLocation);
app.get('/weather', getWeather);

// =========================

//--- CALLBACK FUNCTIONS ------


//callback for /location route *needs to be regular funcion, NOT arrow => function
function getLocation(request, response) {
  let searchQuery = request.query.data;
  console.log(searchQuery)

  // the api request that we make
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${process.env.GEOCODE_API_KEY}`;

  // console.log(superagentResults);

  superagent.get(url).then(superagentResults => {
  // superagent makes an api call for us and using .get

    let results = superagentResults.body.results[0];
    // console.log('results: ', results)

    const formatted_address = results.formatted_address;
    const lat = results.geometry.location.lat;
    const long = results.geometry.location.lng;
    // get that data back in the form of results and turn these parts of that big object into variables
    
    const newLocation = new Location(searchQuery, formatted_address, lat, long);
    // make a new location object using the data from the api's response and feed it into the constructor function

    response.send(newLocation);
    // send that data to the frontend

  }).catch(error => {
    console.log('=====================halp');
    console.error(error);
    response.status(500).send(error.message);
  })

}



function getWeather(request, response) {

  let lat = request.query.data.latitude;
  let long = request.query.data.latitude;
  // read in the args

  const weatherUrl = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}`;
  // make the URL for hitting the API

  superagent.get(weatherUrl).then(superagentResults => {
  
    let darkskyDataArray = superagentResults.body.daily.data;

    const dailyArray = darkskyDataArray.map(day => {
      return new Weather(day)
    });
    response.send(dailyArray);
  }) .catch(error => {

    response.status(500).send(error.message);
    // console.error(error);

  });
}


// ------ get Eventbrite events

functiongetEvents(request, response) {

  let searchQuery = request.query.data;
  console.log(locationObj);
  const url = `https://www.eventbriteapi.com/v3/events/search?token=${EVENTS_API_KEY}&location.address=${locationObj.formatted_address}`;

superagent.get(url
  .then(eventBriteData => { 
    const eventBriteInfo = eventBriteData.body.events.map(eventData => {
      return event;
    });
  })
)

};


// ------ END -----

//-------- constructor funtions
function Location(searchQuery, formatted_address, lat, long) {
  this.search_query = searchQuery;
  this.formatted_query = formatted_address;
  this.latitude = lat;
  this.longitude = long;
}

function Weather(darkskyData) {
  // this.time = darkskyData.time;
  this.time = new Date(darkskyData.time * 1000).toDateString();
  // this.time = new Date(darkskyData.time).toDateString();
  this.forecast = darkskyData.summary;
}

functionEvent(eventBriteStuf) {
  this.link = eventBriteStuff.url;
  this.name = eventBriteStuff.name.text;
  this.event_date = new Date(eventBriteStuff.start.local).toDateString();
  this.summary = eventBriteStuff.summary;
}

// --------- END --------

















//listen
app.listen(PORT, () => console.log(`listening on ${PORT}`));

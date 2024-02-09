MikeG
// Input api key
const API_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';

// Vvenue ID for VyStar Veterans Memorial Arena
const venueId = 'KovZpZAE67AA';

// choose how far in advance for dates
const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 16);

// Format the dates in the required format for the API call (YYYY-MM-DDTHH:MM:SSZ)
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

// Construct the URL for the API call
const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&venueId=${venueId}&startDateTime=${formattedStartDate}T00:00:00Z&endDateTime=${formattedEndDate}T23:59:59Z`;

// Make the API call using fetch
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the data returned from the API
    if (data._embedded && data._embedded.events) {
      const events = data._embedded.events;
      events.forEach(event => {
        console.log(event);
      });
    } else {
      console.error('No events found in the response.');
    }
  })
  .catch(error => {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  });
=======
 Yaya
// my api key TEMP ====>>>>
const API_KEY = "cbde34e952d460bd41b32f1481b9f5b4"; // API key for OpenWeatherMap API
// my api key TEMP ====>>
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=30.332184&lon=-81.655647&appid=cbde34e952d460bd41b32f1481b9f5b4`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

<<<<<<< HEAD
=======
const { getJson } = require("serpapi");
//remove parenthesis and add code between
const API_KEY = ('');

getJson({
  engine: "google",
  api_key: API_KEY,
  q: "coffee",
  location: "Austin, Texas",
}, (json) => {
  console.log(json["organic_results"]);
});


// Server-side code (e.g., using Node.js and Express)

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/search', async (req, res) => {
  const searchText = req.query.q;
  const url = `https://serpapi.com/search.json?engine=google_events&q=${searchText}&hl=en&gl=us`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

 
// Client-side code

const updateText = (event) => {
  const searchText = event.target.value;
  const url = `http://localhost:3000/search?q=${searchText}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const titleText = data.events_results.map(x => x.title).join(",");
      alert(titleText);
    })
    .catch(error => { 
      alert(error.message);
    });
};
 
  //code to decode the search for client 
  const updateText = (event) => {
    const searchText = event.target.value;
    const url = `http://localhost:3000/search?q=${searchText}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const titleText = data.events_results.map(x => x.title).join(",");
        alert(titleText);
      })
      .catch(error => { 
        alert(error.message);
      });
  };

 main

>>>>>>> bcd72fba30869c7bfee5010403e6a62f40d37cbc

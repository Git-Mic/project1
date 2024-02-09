//MikeG
// Input api key
const TPI_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';

// Vvenue ID for VyStar Veterans Memorial Arena
const venueId = 'KovZpZAE67AA';

// Calculate the start and end dates for the date range (up to 16 days from now)
const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 16);

// Format the dates in the required format for the API call (YYYY-MM-DDTHH:MM:SSZ)
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

// Construct the URL for the API call
const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TPI_KEY}&venueId=${venueId}&startDateTime=${formattedStartDate}T00:00:00Z&endDateTime=${formattedEndDate}T23:59:59Z`;

// Get a reference to the container where the event IDs will be displayed
const eventContainer = document.getElementById('event-container');

// Make the API call using fetch
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("bugs bunny")
    var events = data._embedded.events
  
    console.log(events)
    console.log("Yess")
    for(var i = 0; i <events.length; i++){
      console.log(events[i].name)
      console.log(events[i].url)
      console.log(events[i])



    }

    
    // Handle the data returned from the API
    //if (data._embedded && data._embedded.events) {
      //const events = data._embedded.events;
      //events.forEach(event => {
        // Create a new paragraph element for each event ID
        //const eventIdElement = document.createElement('p');
        //eventIdElement.textContent = event.id;
        // Append the event ID element to the event container
        //eventContainer.appendChild(eventIdElement);
     // });
   // } else {
   //   console.error('No events found in the response.');
   // }
  })
  .catch(error => {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  });

// Yaya

const API_KEY = "23c3d2d90a9f18101f425c45b6c3555b"; // API key for OpenWeatherMap API

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

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

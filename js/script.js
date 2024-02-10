//MikeG
// Input api key
const TPI_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';

// Vvenue ID for Kia Orlando
const venueId = 'KovZpZAEvEEA';

// choose how far in advance for dates
const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 16);

// Format the dates in the required format for the API call (YYYY-MM-DDTHH:MM:SSZ)
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

// Construct the URL for the API call
const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TPI_KEY}&venueId=${venueId}&startDateTime=${formattedStartDate}T00:00:00Z&endDateTime=${formattedEndDate}T23:59:59Z`;

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
    var eventsImg = document.createElement("img")
    var date = data._embedded.events.dates.start.localDate


    console.log(events)
    console.log("Yess")
    for(var i = 0; i <events.length; i++){
      console.log(events[i].name)
      console.log(events[i].url)
      console.log(events[i].dates.start.localDate)
      console.log(events[i].dates.start.localTime)
      console.log(events[i].images)
      console.log(date)
      
    var event = document.createElement("div")
    var title = document.createElement("h1")
       
    title.textContent = events[i].name


  }});

 
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

// MikeG
// Input api key
const TPI_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';

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
    console.log('bugs bunny')
    console.log(data)
    var events= data._embedded.events
    console.log(events)
    console.log('yesss')
    for(var i= 0; i <events.length; i++ ){
        console.log(events[i].name)
        console.log(events[i].url)
 }

    // for(var i= o; i<data._events; i++){
    //     console.log(events[i].name)
    //     console.log(events[i].url)
    // }
    
    
    
    
    
    
    
    // Handle the data returned from the API
    // if (data._embedded && data._embedded.events) {
    //   const events = data._embedded.events;
    //   events.forEach(event => {
    //     console.log(event);
    //   });
    // } else {
    //   console.error('No events found in the response.');
    // }
  })
  .catch(error => {
    // Handle any errors that occur during the API call
    console.error('Error:', error);
  });

 
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

// ===== WHAT NEEDS TO BE DONE TO RUN THROUGH
// EACH EVENT WITH EVENTS/IMGS/TIMES/

// fetch(website)
// .then(function(response){return response.json()})
// .then(function(data){
//     console.log(data)
//     for(var i =o; <data.length; i++){

//         var maindiv = document.createElement('div')
//         var title = document.createElement('h1')
//         var date= document.createElement('p')
//         var coneterImg= document.createElement('img')
        
//         title.textContent=data[i].name
//         date.textContent=data[i].date
//         concertImg.setAttribute(src, data[i].poster)

//         maindiv.appendChild(title, date, coneterImg)
//         document.body.appendChild(maindiv)

//     }



// })

// {name:<img tage></img>
// date:
// poster
// }
// // what above code means
// <div>
//     <h1>Website</h1>
//     <p>1/1/2024</p>
//     <img>IMG</img>
// </div>
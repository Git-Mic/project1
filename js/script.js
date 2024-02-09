 Yaya

const API_KEY = "23c3d2d90a9f18101f425c45b6c3555b"; // API key for OpenWeatherMap API

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fifteenDaysForecast = data.list.filter(forecast => {
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
        fifteenDaysForecast.forEach((weatherItem, index) => {
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

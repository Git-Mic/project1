const TPI_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';
// Vvenue ID for VyStar Veterans Memorial Arena
const venueId = 'KovZpZAEvEEA';
// choose how far in advance for dates
//const startDate = new Date();
//const endDate = new Date();
//endDate.setDate(endDate.getDate() + 16);
// Format the dates in the required format for the API call (YYYY-MM-DDTHH:MM:SSZ)
//const formattedStartDate = startDate.toISOString().split('T')[0];
//const formattedEndDate = endDate.toISOString().split('T')[0];
// Construct the URL for the API call
const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TPI_KEY}&venueId=${venueId}`;
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
    for(var i = 0; i <events.length; i++){
      console.log(events[i].name);
      console.log(events[i].url);
      console.log(events[i].dates.start.localDate);
      console.log(events[i].dates.start.localTime);
      console.log(events[i].images);
      var eventContainer = document.createElement("div");
      eventContainer.classList.add("event-container") ;
      var title = document.createElement("h1");
      var date = document.createElement("p");
      var eventsImg = document.createElement("img");
      date.textContent= events[i].dates.start.localDate;
      title.textContent = events[i].name;
      eventsImg.src = events[i].images[0].url;
      document.body.appendChild(eventContainer)
      eventContainer.appendChild(title);
      eventContainer.appendChild(date);
      eventContainer.appendChild(eventsImg);
     
      
  }});

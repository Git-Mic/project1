const TPI_KEY = '53YF2UN6JBTNz0NB3UGOu9GjoEcoxCx7';
// Vvenue ID for Otown
const venueId = 'KovZpZAEvEEA';

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
    //  created an anchor element which makes images clickable
     var eventLink = document.createElement("a");
    //  
      date.textContent= events[i].dates.start.localDate;
      title.textContent = events[i].name;
      eventsImg.src = events[i].images[6].url;

    // href is linked to ticketmaster site,
    // link is set to go to ticketmaster page
     eventLink.href = events[i].url;

     // event image is appended to the anchor/events/images
    // when image is clicked link directs user ticketmaster page
     eventLink.appendChild(eventsImg);



      document.body.appendChild(eventContainer)
      eventContainer.appendChild(title);
      eventContainer.appendChild(date);
      // eventContainer.appendChild(eventsImg);
       

      //  appended  anchor element eventlink to event container
      // places ENTIRE event inside container
      eventContainer.appendChild(eventLink);
     
      
  }});


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
      // removed because need eventImg appended to ticketmaster link anchor
       

      //  appended  anchor element eventlink to event container
      // places ENTIRE event inside container
      eventContainer.appendChild(eventLink);
     
      
  }});
// google maps API

   
const API_KEY = 'AIzaSyCdapCkbW7WMesVzMRRwDi-_evEntjhj3A';
// Construct the URL for the API call
const gogoUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
function initMap() {
    // Create the map.
    const vystar = { lat: 28.5383 , lng: -81.3792 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: vystar,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
    // Perform a nearby search.
    service.nearbySearch(
      { location: vystar, radius: 500, type: "restaurant" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      },
    );
  }
  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

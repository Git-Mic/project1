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

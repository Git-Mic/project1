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


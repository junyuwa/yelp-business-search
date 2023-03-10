const express = require('express');
const cors = require('cors');

const axios = require('axios');
const url = require('url')
const http = require('http')

const yelpKey = '8B2aADVAA-BzQecQSVvNbk-tbeuKBqRHbMPU2Re3sexMkC-MdOasIpvz7te6Ck73SSYtWBXpwSB62BunPPyfBy1Qw4dOOkVKe_f1LNDSZpObwzk9LtsFSrglR9krY3Yx';
const googleKey = 'AIzaSyABugfGt8fixbAgbqR-JZW_WHj-W5beygg';
const app = express();
const router = express.Router();

app.set('trust proxy', true);

app.use(cors({
  credentials: true,
  origin: '*'
}));


app.get("/", (req, res) => {
  res.send("up and running")
})

// test if data can be retrieved in backend
app.get("/test", (req, res) => {
  axios.get("https://api.yelp.com/v3/businesses/search",
    {
      headers: { 'Authorization': `Bearer ${yelpKey}` },
      params: {
        term: 'donut',
        location: 'ucla',
        radius: '1000'
      }
    }).then((response) => {
      var testResult = response.data.businesses;
      res.send(testResult);
    })
})

// input keyword autocomplete
app.get("/:text", (req, res) => {
  let yelpURL = "https://api.yelp.com/v3/autocomplete";
  let header = { Authorization: `bearer ${yelpKey}` };
  let params = { 'text': req.params.text }
  axios.get(yelpURL, {
    headers: header,
    params: params
  })
    .then((response) => {
      let autocompleteCatResults = response.data.categories;
      let autocompleteNameResults = response.data.term;

      res.send(autocompleteCatResults);
    })
});

// google geocoding
app.get("/geo/:location", (req, res) => {
  let loc = req.params.location;

  console.log("https://maps.googleapis.com/maps/api/geocode/json?address=" + loc + "&key=" + googleKey);
  axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + loc + "&key=" + googleKey)
    .then((geo) => {
      let result = geo.data.results[0].geometry.location;
      let lat = result.lat;
      let lng = result.lng;
      console.log(lat);
      console.log(lng);
      let locArray = [lat, lng];
      console.log(locArray);
      res.send(locArray)
    })
    .catch(e => {
      res.send(e);
      console.log(e);
    })
});


// search and return business results
app.get("/search/:term/:latitude/:longitude/:distance/:category", (req, res) => {
  let baseURL = "https://api.yelp.com/v3/businesses/search";
  console.log(req.params);
  let key = req.params.term;
  let lat = parseFloat(req.params.latitude);
  let lng = parseFloat(req.params.longitude);
  let category = req.params.category;
  let radius = parseInt(req.params.distance) * 1609
  let params = {
    'term': key,
    'latitude': lat,
    'longitude': lng,
    'categories': category,
    'radius': radius,
    'limit': 10
  }
  console.log(params);
  let header = { Authorization: `bearer ${yelpKey}` };
  axios.get(baseURL, {
    headers: header,
    params: params
  })
    .then((response) => {
      let searchResults = response.data.businesses;
      console.log(searchResults);
      return res.send(searchResults);
    }).catch(e => {
      res.send(e);
    })
});


// display business detail based on id
app.get("/detail/:id", (req, res) => {
  let header = { Authorization: `bearer ${yelpKey}` };
  console.log(req.params);
  let id = req.params.id;
  let yelpURL = `https://api.yelp.com/v3/businesses/${id}`
  axios.get(yelpURL, { headers: header })
    .then((response) => {
      let detailResults = response.data;
      console.log(detailResults);
      return res.send(detailResults);
    }).catch(e => {
      res.send(e)
    })
})


// display business reviews
app.get("/reviews/:id", (req, res) => {
  let header = { Authorization: `bearer ${yelpKey}` };
  let id = req.params.id;
  let reviewURL = `https://api.yelp.com/v3/businesses/${id}/reviews`
  axios.get(reviewURL, { headers: header })
    .then((response) => {
      let reviewResults = response.data.reviews;
      console.log(reviewResults);
      return res.send(reviewResults)
    })
})


const port = 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

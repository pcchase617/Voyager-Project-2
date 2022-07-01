const Amadeus = require('amadeus');
const { response } = require('express');

const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
require('dotenv').config();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(require('./controllers/homeRoutes'));

const app = express();
const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
});
const port = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/api/autocomplete', async (req, res) => {
  try {
    const { query } = req;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: query.keyword,
      subType: Amadeus.location.city,
    });
    res.json(data);
  } catch (err) {
    console.error(err.res);
    res.json([]);
  }
});

//search for flights (http://localhost:3001/api/search)
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req;
    console.log('QUERY', query);
    const { data } = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: query?.origin,
      destinationLocationCode: query?.destination,
      departureDate: query?.departureDate,
      adults: query?.adults,
      children: query?.children,
      infants: query?.infants,
      travelClass: query?.travelClass,
      ...(query?.returnDate ? { returnDate: query?.returnDate } : {}),
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    response.json([]);
  }
});

app.get('/search', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

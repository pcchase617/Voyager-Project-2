const Amadeus = require('amadeus');
const { response } = require('express');
const session = require('express-session');
//const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('sequelize');
const hbs = exphbs.create({});
require('dotenv').config();

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
});
const port = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.static('public'));

app.use(require('./controllers'));

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

app.use(require('./controllers/homeRoutes'));

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

app.get('/api/trips', (req, res) => {
  trip.getall;
});

app.get('/search', (req, res) => {
  res.render('home');
});

sequelize
  .sync({ force: false })
  .then(() =>
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    )
  );

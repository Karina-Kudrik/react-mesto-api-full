const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { handleErrors } = require('./errors/handleErrors');
const { regex } = require('./models/regex');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { corsOptions } = {
  origin: [
    'http://karinakudrik.mesto.nomoredomains.sbs',
    'https://karinakudrik.mesto.nomoredomains.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  credentials: true,
};

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Mongo подключен'))
  .catch((err) => console.log(err.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (corsOptions.includes(origin)) {
    const { method } = req;
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  next();
});

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/cards', routesCards);
app.use('/users', routesUsers);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

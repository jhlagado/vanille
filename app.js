const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressMessages = require('express-messages');
const session = require('express-session');

const Customer = require('./model/customer');
const customerRoutes = require('./route/customer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(function(req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
});

const customerKeys = [
  'id', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];
app.use('/customers', customerRoutes(Customer, customerKeys));

app.get('/', (_req, res) => {
  res.redirect('/customers');
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

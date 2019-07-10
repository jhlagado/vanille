const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-hbs');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser'); 

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customersRouter = require('./routes/customers');

const app = express();

app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: path.join(__dirname, 'views/layouts/layout')
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(function(req, res, next) {
  res.locals.messages = req.flash(); 
  next();
});

const Customer = require('./models/customer');
const customerRoutes = require('./routes/customers');
const customerKeys = [
  'id', 'first_name', 'last_name',
  'email', 'gender', 'ip_address',
];

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter(Customer, customerKeys));

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
